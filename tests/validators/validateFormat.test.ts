import { describe, it, expect } from 'vitest';
import { isValidFormat } from '../../src/validators/validateFormat';

describe('isValidFormat', () => {
  it('valida e-mails corretos', () => {
    expect(isValidFormat('user@example.com')).toBe(true);
    expect(isValidFormat('john.doe+test@domain.co.uk')).toBe(true);
  });

  it('rejeita e-mails inválidos', () => {
    expect(isValidFormat('user@')).toBe(false);
    expect(isValidFormat('user@.com')).toBe(false);
    expect(isValidFormat('user@domain')).toBe(false);
    expect(isValidFormat('@example.com')).toBe(false);
    expect(isValidFormat('userexample.com')).toBe(false);
  });

  it('rejeita strings vazias ou nulas', () => {
    expect(isValidFormat('')).toBe(false);
    expect(isValidFormat(null as any)).toBe(false);
    expect(isValidFormat(undefined as any)).toBe(false);
  });
});

