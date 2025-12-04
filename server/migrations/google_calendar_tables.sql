-- ============================================
-- Google Calendar Integration Tables
-- ============================================

-- Tabela para tokens do Google Calendar
CREATE TABLE IF NOT EXISTS google_calendar_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  token_type varchar(50) DEFAULT 'Bearer',
  expires_at timestamp with time zone NOT NULL,
  scope text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_gcal_tokens_user_id ON google_calendar_tokens(user_id);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  description text,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone,
  location text,
  event_type varchar(50),
  google_calendar_event_id text,
  google_calendar_id text DEFAULT 'primary',
  video_conference_link text,
  reminder_sent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_google_calendar_event_id ON events(google_calendar_event_id);

-- Comentários
COMMENT ON TABLE google_calendar_tokens IS 'Armazena tokens OAuth do Google Calendar por usuário';
COMMENT ON TABLE events IS 'Eventos dos usuários com integração opcional ao Google Calendar';
COMMENT ON COLUMN events.google_calendar_event_id IS 'ID do evento no Google Calendar (se sincronizado)';
COMMENT ON COLUMN events.video_conference_link IS 'Link do Google Meet (gerado automaticamente)';
COMMENT ON COLUMN events.reminder_sent IS 'Flag para controle de lembretes enviados';
