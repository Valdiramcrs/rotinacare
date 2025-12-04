-- ============================================
-- ROTINACARE - COMPLETE DATABASE MIGRATION
-- ============================================
-- Este arquivo cria TODAS as tabelas necessárias para o RotinaCare
-- Executar no SQL Editor do Supabase
-- ============================================

-- ============================================
-- TABELA 1: users
-- ============================================

CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    role varchar(50) NOT NULL DEFAULT 'patient',
    avatar_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para users
CREATE INDEX IF NOT EXISTS ix_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS ix_users_role ON public.users(role);

-- RLS para users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: usuários podem ver e editar seus próprios dados
CREATE POLICY IF NOT EXISTS users_manage_own_data 
ON public.users 
FOR ALL 
USING (id = current_setting('app.current_user_id', true)::uuid);

COMMENT ON TABLE public.users IS 'Users table - stores patients, doctors, and admins';

-- ============================================
-- TABELA 2: doctors
-- ============================================

CREATE TABLE IF NOT EXISTS public.doctors (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    specialty varchar(255) NOT NULL,
    crm varchar(50) NOT NULL,
    phone varchar(20),
    email varchar(255),
    city varchar(100),
    state varchar(2),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para doctors
CREATE INDEX IF NOT EXISTS ix_doctors_user_id ON public.doctors(user_id);
CREATE INDEX IF NOT EXISTS ix_doctors_crm ON public.doctors(crm);

-- RLS para doctors
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS doctors_manage_own_data 
ON public.doctors 
FOR ALL 
USING (user_id = current_setting('app.current_user_id', true)::uuid);

COMMENT ON TABLE public.doctors IS 'Doctors registered by users';

-- ============================================
-- TABELA 3: medications
-- ============================================

CREATE TABLE IF NOT EXISTS public.medications (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    dosage varchar(100) NOT NULL,
    frequency varchar(100) NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    notes text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para medications
CREATE INDEX IF NOT EXISTS ix_medications_user_id ON public.medications(user_id);
CREATE INDEX IF NOT EXISTS ix_medications_active ON public.medications(active);

-- RLS para medications
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS medications_manage_own_data 
ON public.medications 
FOR ALL 
USING (user_id = current_setting('app.current_user_id', true)::uuid);

COMMENT ON TABLE public.medications IS 'User medications management';

-- ============================================
-- TABELA 4: exams
-- ============================================

CREATE TABLE IF NOT EXISTS public.exams (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    date timestamp with time zone NOT NULL,
    laboratory varchar(255),
    result text,
    file_url text,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para exams
CREATE INDEX IF NOT EXISTS ix_exams_user_id ON public.exams(user_id);
CREATE INDEX IF NOT EXISTS ix_exams_date ON public.exams(date);

-- RLS para exams
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS exams_manage_own_data 
ON public.exams 
FOR ALL 
USING (user_id = current_setting('app.current_user_id', true)::uuid);

COMMENT ON TABLE public.exams IS 'User medical exams records';

-- ============================================
-- TABELA 5: appointments
-- ============================================

CREATE TABLE IF NOT EXISTS public.appointments (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    doctor_id uuid REFERENCES public.doctors(id) ON DELETE SET NULL,
    title varchar(255) NOT NULL,
    date timestamp with time zone NOT NULL,
    location varchar(255),
    notes text,
    status varchar(50) DEFAULT 'scheduled' NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para appointments
CREATE INDEX IF NOT EXISTS ix_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS ix_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS ix_appointments_date ON public.appointments(date);
CREATE INDEX IF NOT EXISTS ix_appointments_status ON public.appointments(status);

-- RLS para appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS appointments_manage_own_data 
ON public.appointments 
FOR ALL 
USING (user_id = current_setting('app.current_user_id', true)::uuid);

COMMENT ON TABLE public.appointments IS 'User medical appointments scheduling';

-- ============================================
-- TABELA 6: events
-- ============================================

CREATE TABLE IF NOT EXISTS public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
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
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para events
CREATE INDEX IF NOT EXISTS ix_events_user_id ON public.events(user_id);
CREATE INDEX IF NOT EXISTS ix_events_start_time ON public.events(start_time);
CREATE INDEX IF NOT EXISTS ix_events_google_calendar_event_id ON public.events(google_calendar_event_id);

-- RLS para events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS events_manage_own_data 
ON public.events 
FOR ALL 
USING (user_id = current_setting('app.current_user_id', true)::uuid);

COMMENT ON TABLE public.events IS 'User events with optional Google Calendar integration';

-- ============================================
-- TABELA 7: google_calendar_tokens
-- ============================================

CREATE TABLE IF NOT EXISTS public.google_calendar_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    access_token text NOT NULL,
    refresh_token text NOT NULL,
    token_type varchar(50) DEFAULT 'Bearer',
    expires_at timestamp with time zone NOT NULL,
    scope text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Índices para google_calendar_tokens
CREATE INDEX IF NOT EXISTS ix_google_calendar_tokens_user_id ON public.google_calendar_tokens(user_id);

-- RLS para google_calendar_tokens
ALTER TABLE public.google_calendar_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS google_calendar_tokens_manage_own_data 
ON public.google_calendar_tokens 
FOR ALL 
USING (user_id = current_setting('app.current_user_id', true)::uuid);

COMMENT ON TABLE public.google_calendar_tokens IS 'Google Calendar OAuth tokens for each user';

-- ============================================
-- FINALIZAÇÃO
-- ============================================

-- Verificar tabelas criadas
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('users', 'doctors', 'medications', 'exams', 'appointments', 'events', 'google_calendar_tokens')
ORDER BY tablename;
