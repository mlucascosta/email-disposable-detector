import { isOneTimeMail } from 'otm-detector';

/**
 * Verifica se o domínio informado é de um e-mail descartável (one-time mail).
 * @param domain Domínio do e-mail (ex: mailinator.com)
 * @returns true se for descartável, false caso contrário
 */
export async function checkOTM(domain: string): Promise<boolean> {
  return isOneTimeMail(domain);
}

