-- ============================================
-- SCRIPT 1: Criar tabela google_calendar_tokens
-- ============================================

-- Tabela para armazenar tokens do Google Calendar
CREATE TABLE public.google_calendar_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    access_token text NOT NULL,
    refresh_token text NOT NULL,
    token_type varchar(50) DEFAULT 'Bearer',
    expires_at timestamp with time zone NOT NULL,
    scope text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Index para busca por user_id
CREATE INDEX ix_google_calendar_tokens_user_id ON public.google_calendar_tokens(user_id);

-- Habilitar RLS
ALTER TABLE public.google_calendar_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: usuários só podem ver/editar seus próprios tokens
CREATE POLICY "Users can manage their own Google Calendar tokens" 
ON public.google_calendar_tokens
FOR ALL
USING (auth.uid() = user_id);

-- Comentário
COMMENT ON TABLE public.google_calendar_tokens IS 'Stores Google Calendar OAuth tokens for each user';


-- ============================================
-- SCRIPT 2: Adicionar campos na tabela events
-- ============================================

-- Adicionar campos para Google Calendar na tabela events
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS google_calendar_event_id text,
ADD COLUMN IF NOT EXISTS google_calendar_id text DEFAULT 'primary',
ADD COLUMN IF NOT EXISTS video_conference_link text,
ADD COLUMN IF NOT EXISTS reminder_sent boolean DEFAULT false;

-- Index para busca por google_calendar_event_id
CREATE INDEX IF NOT EXISTS ix_events_google_calendar_event_id 
ON public.events(google_calendar_event_id);


-- ============================================
-- COMANDOS DE VERIFICAÇÃO
-- ============================================

-- Verificar estrutura da tabela google_calendar_tokens
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'google_calendar_tokens';

-- Verificar RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'google_calendar_tokens';

-- Verificar novos campos em events
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' 
AND column_name IN ('google_calendar_event_id', 'google_calendar_id', 'video_conference_link', 'reminder_sent');
