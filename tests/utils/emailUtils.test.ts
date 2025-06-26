import { describe, it, expect } from 'vitest';
import {
  isAliasEmail,
  isRoleAccount,
  isPublicDomain,
  isRelayDomain
} from '../../src/utils/emailUtils';

describe('emailUtils', () => {
  describe('isAliasEmail', () => {
    it('detecta alias com + no local part', () => {
      expect(isAliasEmail('user+promo@gmail.com')).toBe(true);
      expect(isAliasEmail('john.doe+abc@outlook.com')).toBe(true);
    });

    it('não detecta alias se não tiver +', () => {
      expect(isAliasEmail('user@gmail.com')).toBe(false);
    });
  });

  describe('isRoleAccount', () => {
    it('detecta contas do tipo info, admin, support, contato', () => {
      expect(isRoleAccount('info@empresa.com')).toBe(true);
      expect(isRoleAccount('admin@dominio.com')).toBe(true);
      expect(isRoleAccount('contato@meusite.com')).toBe(true);
      expect(isRoleAccount('suporte@empresa.com')).toBe(true);
    });

    it('não detecta se nome for pessoal', () => {
      expect(isRoleAccount('joao@empresa.com')).toBe(false);
    });
  });

  describe('isPublicDomain', () => {
    it('detecta domínio público comum', () => {
      expect(isPublicDomain('gmail.com')).toBe(true);
      expect(isPublicDomain('hotmail.com')).toBe(true);
      expect(isPublicDomain('yahoo.com')).toBe(true);
    });

    it('não detecta domínios privados', () => {
      expect(isPublicDomain('minhaempresa.com')).toBe(false);
    });
  });

  describe('isRelayDomain', () => {
    it('detecta domínios de redirecionamento', () => {
      expect(isRelayDomain('anonaddy.com')).toBe(true);
      expect(isRelayDomain('33mail.com')).toBe(true);
    });

    it('não detecta domínios comuns', () => {
      expect(isRelayDomain('gmail.com')).toBe(false);
    });
  });
});

