-- Migration: Add Google OAuth fields to users table
-- Date: 2025-01-05
-- Description: Adiciona campos para armazenar informações de autenticação OAuth do Google

-- Adicionar colunas para Google OAuth
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS google_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS google_access_token TEXT,
ADD COLUMN IF NOT EXISTS google_refresh_token TEXT;

-- Criar índice para busca por Google ID
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- Comentários
COMMENT ON COLUMN users.google_id IS 'Google user ID (sub claim from OAuth)';
COMMENT ON COLUMN users.google_access_token IS 'Google OAuth access token for API calls';
COMMENT ON COLUMN users.google_refresh_token IS 'Google OAuth refresh token for renewing access';
