import { describe, it, expect } from 'vitest';
import { isInBlocklist } from '../../src/validators/checkBlocklist';

describe('isInBlocklist', () => {
  it('retorna true se o domínio estiver na lista', () => {
    expect(isInBlocklist('mailinator.com')).toBe(true);
    expect(isInBlocklist('10minutemail.com')).toBe(true);
  });

  it('retorna false se o domínio não estiver na lista', () => {
    expect(isInBlocklist('gmail.com')).toBe(false);
    expect(isInBlocklist('outlook.com')).toBe(false);
    expect(isInBlocklist('dominiofalso.dev')).toBe(false);
  });

  it('ignora capitalização e espaços', () => {
    expect(isInBlocklist('  MAILINATOR.com  ')).toBe(true);
  });
});

