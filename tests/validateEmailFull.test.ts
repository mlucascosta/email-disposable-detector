// tests/validateEmailFull.test.ts
import { describe, test, expect, vi } from 'vitest';
import { validateEmailFull } from '../src/validateEmailFull';
import * as domainInfo from '../src/enrichers/domainInfo';
import * as checkFallbacks from '../src/validators/checkFallbacks';

vi.mock('../src/enrichers/domainInfo');
vi.mock('../src/validators/checkFallbacks');

describe('validateEmailFull', () => {
  test('retorna resultado completo esperado', async () => {
    vi.spyOn(domainInfo, 'getDomainInfo').mockResolvedValue({
      domain: 'example.com',
      domain_age_in_days: 1234,
      mx: true,
      blocklisted: false,
    });

    vi.spyOn(checkFallbacks, 'checkFallbacks').mockResolvedValue({
      disposable: false,
      public_domain: false,
      relay_domain: false,
      spam: false,
    });

    const result = await validateEmailFull('user@example.com');

    expect(result).toEqual({
      status: 200,
      email: 'user@example.com',
      normalized_email: 'user@example.com',
      domain: 'example.com',
      domain_age_in_days: 1234,
      mx: true,
      disposable: false,
      public_domain: false,
      relay_domain: false,
      alias: false,
      role_account: false,
      did_you_mean: null,
      blocklisted: false,
      spam: false,
    });
  });
});

