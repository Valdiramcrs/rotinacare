-- ============================================
-- PASSO 1: Criar tabela google_calendar_tokens
-- ============================================

CREATE TABLE IF NOT EXISTS public.google_calendar_tokens (
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

-- ============================================
-- PASSO 2: Criar índice
-- ============================================

CREATE INDEX IF NOT EXISTS ix_google_calendar_tokens_user_id 
ON public.google_calendar_tokens(user_id);

-- ============================================
-- PASSO 3: Habilitar RLS
-- ============================================

ALTER TABLE public.google_calendar_tokens ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PASSO 4: Criar policy
-- ============================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'google_calendar_tokens' 
        AND policyname = 'users_manage_own_tokens'
    ) THEN
        CREATE POLICY users_manage_own_tokens 
        ON public.google_calendar_tokens 
        FOR ALL 
        USING (auth.uid() = user_id);
    END IF;
END$$;

-- ============================================
-- PASSO 5: Adicionar comentário
-- ============================================

COMMENT ON TABLE public.google_calendar_tokens IS 'Stores Google Calendar OAuth tokens for each user';

-- ============================================
-- PASSO 6: Adicionar campos na tabela events
-- ============================================

ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS google_calendar_event_id text,
ADD COLUMN IF NOT EXISTS google_calendar_id text DEFAULT 'primary',
ADD COLUMN IF NOT EXISTS video_conference_link text,
ADD COLUMN IF NOT EXISTS reminder_sent boolean DEFAULT false;

-- ============================================
-- PASSO 7: Criar índice na tabela events
-- ============================================

CREATE INDEX IF NOT EXISTS ix_events_google_calendar_event_id 
ON public.events(google_calendar_event_id);
