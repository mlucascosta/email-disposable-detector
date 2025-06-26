import disposableDomains from '../../disposable_email_blocklist.json';

/**
 * Verifica se o domínio está na lista local de domínios descartáveis.
 */
export function isInBlocklist(domain: string): boolean {
  const cleanDomain = domain.trim().toLowerCase();
  return disposableDomains.includes(cleanDomain);
}

