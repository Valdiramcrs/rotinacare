import { describe, it, expect } from 'vitest';
import {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  extractToken,
} from '../auth';

describe('Auth Utils', () => {
  describe('generateToken', () => {
    it('deve gerar um token JWT válido', () => {
      const payload = {
        userId: '123',
        email: 'test@example.com',
        role: 'patient' as const,
      };

      const token = generateToken(payload);
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT tem 3 partes
    });
  });

  describe('verifyToken', () => {
    it('deve verificar e decodificar token válido', () => {
      const payload = {
        userId: '123',
        email: 'test@example.com',
        role: 'patient' as const,
      };

      const token = generateToken(payload);
      const decoded = verifyToken(token);

      expect(decoded).toBeTruthy();
      expect(decoded?.userId).toBe(payload.userId);
      expect(decoded?.email).toBe(payload.email);
      expect(decoded?.role).toBe(payload.role);
    });

    it('deve retornar null para token inválido', () => {
      const decoded = verifyToken('invalid-token');
      expect(decoded).toBeNull();
    });

    it('deve retornar null para token vazio', () => {
      const decoded = verifyToken('');
      expect(decoded).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('deve gerar hash de senha', async () => {
      const password = 'senha123';
      const hash = await hashPassword(password);

      expect(hash).toBeTruthy();
      expect(typeof hash).toBe('string');
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(20);
    });

    it('deve gerar hashes diferentes para a mesma senha', async () => {
      const password = 'senha123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    it('deve retornar true para senha correta', async () => {
      const password = 'senha123';
      const hash = await hashPassword(password);
      const isValid = await comparePassword(password, hash);

      expect(isValid).toBe(true);
    });

    it('deve retornar false para senha incorreta', async () => {
      const password = 'senha123';
      const wrongPassword = 'senha456';
      const hash = await hashPassword(password);
      const isValid = await comparePassword(wrongPassword, hash);

      expect(isValid).toBe(false);
    });
  });

  describe('extractToken', () => {
    it('deve extrair token com prefixo Bearer', () => {
      const token = 'abc123';
      const authHeader = `Bearer ${token}`;
      const extracted = extractToken(authHeader);

      expect(extracted).toBe(token);
    });

    it('deve retornar token sem prefixo', () => {
      const token = 'abc123';
      const extracted = extractToken(token);

      expect(extracted).toBe(token);
    });

    it('deve retornar null para header vazio', () => {
      const extracted = extractToken('');
      expect(extracted).toBeNull();
    });
  });
});
