-- Migração: Sistema de Múltiplos Papéis
-- Data: 2025-01-04
-- Descrição: Adiciona is_admin, is_professional, is_patient para permitir múltiplos roles por usuário

-- 1. Adicionar novas colunas
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_professional BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_patient BOOLEAN DEFAULT true;

-- 2. Migrar dados existentes baseado no role atual
UPDATE users SET is_admin = true WHERE role = 'admin';
UPDATE users SET is_professional = true WHERE role = 'professional';
UPDATE users SET is_patient = true WHERE role = 'patient';

-- 3. Dar todos os papéis ao Valdiram (admin principal)
UPDATE users SET 
  is_admin = true, 
  is_professional = true, 
  is_patient = true 
WHERE email = 'valdiramcrs@gmail.com';

-- Também para a outra conta
UPDATE users SET 
  is_admin = true, 
  is_professional = true, 
  is_patient = true 
WHERE email = 'contato@valdiramcassimiro.com';

-- 4. Verificar resultado
SELECT id, email, name, role, is_admin, is_professional, is_patient FROM users;
