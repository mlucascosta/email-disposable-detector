import { describe, it, expect } from 'vitest';
import { suggestDomain } from '../../src/utils/suggestDomain';

describe('suggestDomain', () => {
  it('sugere "gmail.com" quando domínio for "gmaill.com"', () => {
    const suggestion = suggestDomain('gmaill.com');
    expect(suggestion).toBe('gmail.com');
  });

  it('sugere "outlook.com" quando domínio for "outlok.com"', () => {
    const suggestion = suggestDomain('outlok.com');
    expect(suggestion).toBe('outlook.com');
  });

  it('retorna null se não houver domínio próximo', () => {
    const suggestion = suggestDomain('xpto-aleatorio.dev');
    expect(suggestion).toBeNull();
  });
});

