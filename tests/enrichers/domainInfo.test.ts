import { describe, it, expect, vi, beforeEach } from 'vitest';
import dns from 'dns/promises';
import whoiser from 'whoiser';
import {
  getMXStatus,
  getDomainAgeInDays,
  isBlocklisted
} from '../../src/enrichers/domainInfo';

// Mocks
vi.mock('dns/promises', () => ({
  default: {
    resolveMx: vi.fn()
  }
}));

vi.mock('whoiser', () => ({
  default: {
    whois: vi.fn()
  }
}));

describe('domainInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMXStatus', () => {
    it('retorna true se houver registros MX', async () => {
      (dns.resolveMx as any).mockResolvedValueOnce([{ exchange: 'mx.example.com' }]);
      const result = await getMXStatus('example.com');
      expect(result).toBe(true);
    });

    it('retorna false se não houver registros MX', async () => {
      (dns.resolveMx as any).mockResolvedValueOnce([]);
      const result = await getMXStatus('no-mx.com');
      expect(result).toBe(false);
    });

    it('retorna false se houver erro', async () => {
      (dns.resolveMx as any).mockRejectedValueOnce(new Error('fail'));
      const result = await getMXStatus('error.com');
      expect(result).toBe(false);
    });
  });

  describe('getDomainAgeInDays', () => {
    it('retorna a idade do domínio em dias', async () => {
      const mockDate = new Date();
      mockDate.setDate(mockDate.getDate() - 1000);

      (whoiser.whois as any).mockResolvedValueOnce({
        'example.com': {
          'Creation Date': mockDate.toISOString(),
        }
      });

      const result = await getDomainAgeInDays('example.com');
      expect(result).toBeGreaterThanOrEqual(999);
    });

    it('retorna null se WHOIS falhar', async () => {
      (whoiser.whois as any).mockRejectedValueOnce(new Error('fail'));
      const result = await getDomainAgeInDays('fail.com');
      expect(result).toBeNull();
    });
  });

  describe('isBlocklisted', () => {
    it('retorna false (stub)', async () => {
      const result = await isBlocklisted('example.com');
      expect(result).toBe(false);
    });
  });
});

