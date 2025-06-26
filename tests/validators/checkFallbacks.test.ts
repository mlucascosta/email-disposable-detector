import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { checkFallbacks } from '../../src/validators/checkFallbacks';

vi.mock('axios');

const mockAxios = axios as unknown as { get: any };

describe('checkFallbacks', () => {
  it('detecta e-mail descartável se uma das APIs retornar disposable: true', async () => {
    mockAxios.get = vi.fn((url: string) => {
      if (url.includes('disify')) {
        return Promise.resolve({ data: { disposable: true } });
      }
      return Promise.resolve({ data: {} });
    });

    const result = await checkFallbacks('user@mailinator.com');

    expect(result.disposable).toBe(true);
    expect(result.spam).toBe(false);
  });

  it('detecta spam se uma das APIs retornar spam: true', async () => {
    mockAxios.get = vi.fn((url: string) => {
      if (url.includes('validator.pizza')) {
        return Promise.resolve({ data: { spam: true } });
      }
      return Promise.resolve({ data: {} });
    });

    const result = await checkFallbacks('user@example.com');
    expect(result.spam).toBe(true);
  });

  it('retorna false quando nenhuma API retorna disposable/spam', async () => {
    mockAxios.get = vi.fn(() => Promise.resolve({ data: {} }));

    const result = await checkFallbacks('normal@domain.com');

    expect(result.disposable).toBe(false);
    expect(result.spam).toBe(false);
  });

  it('continua mesmo que uma API falhe', async () => {
    mockAxios.get = vi.fn((url: string) => {
      if (url.includes('debounce')) {
        return Promise.reject(new Error('Erro na API'));
      }
      return Promise.resolve({ data: {} });
    });

    const result = await checkFallbacks('x@y.com');
    expect(result.disposable).toBe(false);
  });
});

