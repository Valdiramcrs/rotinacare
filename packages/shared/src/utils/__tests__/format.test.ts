import { describe, it, expect } from 'vitest';
import { formatCPF, formatPhone, formatCRM } from '../format';

describe('Format Utils', () => {
  describe('formatCPF', () => {
    it('deve formatar CPF corretamente', () => {
      expect(formatCPF('12345678900')).toBe('123.456.789-00');
    });

    it('deve retornar string vazia para CPF inválido', () => {
      expect(formatCPF('123')).toBe('');
      expect(formatCPF('')).toBe('');
    });

    it('deve remover caracteres não numéricos antes de formatar', () => {
      expect(formatCPF('123.456.789-00')).toBe('123.456.789-00');
    });
  });

  describe('formatPhone', () => {
    it('deve formatar telefone celular corretamente', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
    });

    it('deve formatar telefone fixo corretamente', () => {
      expect(formatPhone('1133334444')).toBe('(11) 3333-4444');
    });

    it('deve retornar string vazia para telefone inválido', () => {
      expect(formatPhone('123')).toBe('');
      expect(formatPhone('')).toBe('');
    });
  });

  describe('formatCRM', () => {
    it('deve formatar CRM corretamente', () => {
      expect(formatCRM('12345', 'SP')).toBe('12345-SP');
    });

    it('deve retornar apenas número se estado não fornecido', () => {
      expect(formatCRM('12345')).toBe('12345');
    });

    it('deve retornar string vazia para CRM vazio', () => {
      expect(formatCRM('')).toBe('');
    });
  });
});
