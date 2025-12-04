CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    role varchar(50) DEFAULT 'patient',
    avatar_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.doctors (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    specialty varchar(255) NOT NULL,
    crm varchar(50) NOT NULL,
    phone varchar(20),
    email varchar(255),
    city varchar(100),
    state varchar(2),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.medications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    dosage varchar(100) NOT NULL,
    frequency varchar(100) NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    notes text,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.exams (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    date timestamp with time zone NOT NULL,
    laboratory varchar(255),
    result text,
    file_url text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.appointments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    doctor_id uuid REFERENCES public.doctors(id) ON DELETE SET NULL,
    title varchar(255) NOT NULL,
    date timestamp with time zone NOT NULL,
    location varchar(255),
    notes text,
    status varchar(50) DEFAULT 'scheduled',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
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
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.google_calendar_tokens (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    access_token text NOT NULL,
    refresh_token text NOT NULL,
    token_type varchar(50) DEFAULT 'Bearer',
    expires_at timestamp with time zone NOT NULL,
    scope text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
