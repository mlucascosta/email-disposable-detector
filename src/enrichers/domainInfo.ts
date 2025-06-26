import dns from 'node:dns/promises';
import whoiser from 'whoiser';

export async function getMXStatus(domain: string): Promise<boolean> {
  try {
    const mx = await dns.resolveMx(domain);
    return mx.length > 0;
  } catch {
    return false;
  }
}

export async function getDomainAgeInDays(domain: string): Promise<number | null> {
  try {
    const info = await whoiser.whois(domain);
    const creationDateStr = info?.[domain]?.['Creation Date'];
    if (!creationDateStr) return null;

    const created = new Date(creationDateStr);
    const diff = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  } catch {
    return null;
  }
}

export async function isBlocklisted(domain: string): Promise<boolean> {
  return false; // stub por enquanto
}

export async function getDomainInfo(domain: string) {
  const [mx, domain_age_in_days, blocklisted] = await Promise.all([
    getMXStatus(domain),
    getDomainAgeInDays(domain),
    isBlocklisted(domain)
  ]);

  return {
    domain,
    domain_age_in_days,
    mx,
    public_domain: false,   // pode adicionar lógica futura
    relay_domain: false,
    alias: false,
    role_account: false,
    blocklisted
  };
}

