import { google } from 'googleapis';
import { db } from '../db/index.js';
import { googleCalendarTokens, events } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// ============================================
// CONFIGURAÇÃO
// ============================================

function getRedirectUri(): string {
  if (process.env.GOOGLE_CALENDAR_REDIRECT_URI) {
    return process.env.GOOGLE_CALENDAR_REDIRECT_URI;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.rotinacare.com/api/google-calendar/callback';
  }
  return 'http://localhost:4000/api/google-calendar/callback';
}

function getConfig() {
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
  const redirectUri = getRedirectUri();

  if (!clientId || !clientSecret) {
    throw new Error('Google Calendar credentials not configured');
  }

  return { clientId, clientSecret, redirectUri };
}

export function createOAuth2Client() {
  const { clientId, clientSecret, redirectUri } = getConfig();
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

// ============================================
// OAUTH FLOW
// ============================================

export function getAuthorizationUrl(userId: string): string {
  const oauth2Client = createOAuth2Client();

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
    state: userId,
  });
}

export async function exchangeCodeForTokens(code: string, userId: string) {
  const oauth2Client = createOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);

  if (!tokens.access_token) {
    throw new Error('Failed to get access token');
  }

  let refreshToken = tokens.refresh_token;

  // Se não recebeu refresh_token, manter o existente
  if (!refreshToken) {
    const [existing] = await db
      .select({ refreshToken: googleCalendarTokens.refreshToken })
      .from(googleCalendarTokens)
      .where(eq(googleCalendarTokens.userId, userId))
      .limit(1);

    refreshToken = existing?.refreshToken;

    if (!refreshToken) {
      throw new Error('No refresh token. User needs to revoke and reconnect.');
    }
  }

  const expiresAt = new Date(tokens.expiry_date || Date.now() + 3600 * 1000);

  // Upsert tokens
  await db
    .insert(googleCalendarTokens)
    .values({
      userId,
      accessToken: tokens.access_token,
      refreshToken,
      tokenType: tokens.token_type || 'Bearer',
      expiresAt,
      scope: tokens.scope || '',
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: googleCalendarTokens.userId,
      set: {
        accessToken: tokens.access_token,
        refreshToken,
        expiresAt,
        scope: tokens.scope || '',
        updatedAt: new Date(),
      },
    });

  return tokens;
}

export async function getValidAccessToken(userId: string): Promise<string> {
  const [tokenRecord] = await db
    .select()
    .from(googleCalendarTokens)
    .where(eq(googleCalendarTokens.userId, userId))
    .limit(1);

  if (!tokenRecord) {
    throw new Error('Google Calendar not connected');
  }

  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials({
    access_token: tokenRecord.accessToken,
    refresh_token: tokenRecord.refreshToken,
  });

  // Verificar se expirou (margem de 5 min)
  const now = new Date();
  const marginMs = 5 * 60 * 1000;

  if (now.getTime() >= tokenRecord.expiresAt.getTime() - marginMs) {
    const { credentials } = await oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error('Failed to refresh token');
    }

    const newExpiresAt = new Date(credentials.expiry_date || Date.now() + 3600 * 1000);

    await db
      .update(googleCalendarTokens)
      .set({
        accessToken: credentials.access_token,
        expiresAt: newExpiresAt,
        updatedAt: new Date(),
      })
      .where(eq(googleCalendarTokens.userId, userId));

    return credentials.access_token;
  }

  return tokenRecord.accessToken;
}

// ============================================
// CALENDAR API
// ============================================

export async function getCalendarClient(userId: string) {
  const accessToken = await getValidAccessToken(userId);
  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: 'v3', auth: oauth2Client });
}

export async function listUserCalendars(userId: string) {
  const calendar = await getCalendarClient(userId);
  const response = await calendar.calendarList.list();

  return (response.data.items || []).map((cal) => ({
    id: cal.id || 'primary',
    summary: cal.summary || 'Minha Agenda',
    primary: cal.primary || false,
    backgroundColor: cal.backgroundColor,
  }));
}

export async function syncEventToGoogle(
  userId: string,
  eventId: string,
  calendarId: string = 'primary'
) {
  const calendar = await getCalendarClient(userId);

  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, eventId))
    .limit(1);

  if (!event) {
    throw new Error('Event not found');
  }

  const startTime = new Date(event.startTime);
  const endTime = event.endTime
    ? new Date(event.endTime)
    : new Date(startTime.getTime() + 60 * 60 * 1000);

  const googleEvent: any = {
    summary: event.title,
    description: event.description || undefined,
    location: event.location || undefined,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'America/Sao_Paulo',
    },
    conferenceData: {
      createRequest: {
        requestId: `rotinaCare-${eventId}-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  let response;

  if (event.googleCalendarEventId) {
    response = await calendar.events.update({
      calendarId,
      eventId: event.googleCalendarEventId,
      requestBody: googleEvent,
      conferenceDataVersion: 1,
    });
  } else {
    response = await calendar.events.insert({
      calendarId,
      requestBody: googleEvent,
      conferenceDataVersion: 1,
    });
  }

  const meetLink =
    response.data.hangoutLink ||
    response.data.conferenceData?.entryPoints?.find(
      (e: any) => e.entryPointType === 'video'
    )?.uri;

  await db
    .update(events)
    .set({
      googleCalendarEventId: response.data.id,
      googleCalendarId: calendarId,
      videoConferenceLink: meetLink || null,
      updatedAt: new Date(),
    })
    .where(eq(events.id, eventId));

  return {
    googleEventId: response.data.id,
    meetLink,
    htmlLink: response.data.htmlLink,
  };
}

export async function deleteEventFromGoogle(userId: string, googleEventId: string, calendarId: string = 'primary') {
  const calendar = await getCalendarClient(userId);
  
  await calendar.events.delete({
    calendarId,
    eventId: googleEventId,
  });

  // Atualizar evento local (remover referência ao Google)
  await db
    .update(events)
    .set({
      googleCalendarEventId: null,
      googleCalendarId: null,
      videoConferenceLink: null,
      updatedAt: new Date(),
    })
    .where(eq(events.googleCalendarEventId, googleEventId));
}

export async function isConnected(userId: string): Promise<boolean> {
  const [record] = await db
    .select({ id: googleCalendarTokens.id })
    .from(googleCalendarTokens)
    .where(eq(googleCalendarTokens.userId, userId))
    .limit(1);

  return !!record;
}

export async function disconnect(userId: string) {
  await db
    .delete(googleCalendarTokens)
    .where(eq(googleCalendarTokens.userId, userId));
}

export async function getConnectionInfo(userId: string) {
  const [tokenRecord] = await db
    .select({
      expiresAt: googleCalendarTokens.expiresAt,
      scope: googleCalendarTokens.scope,
      createdAt: googleCalendarTokens.createdAt,
    })
    .from(googleCalendarTokens)
    .where(eq(googleCalendarTokens.userId, userId))
    .limit(1);

  if (!tokenRecord) {
    return null;
  }

  return {
    connected: true,
    expiresAt: tokenRecord.expiresAt,
    scope: tokenRecord.scope,
    connectedSince: tokenRecord.createdAt,
  };
}
