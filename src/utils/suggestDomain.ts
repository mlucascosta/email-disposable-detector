import { distance } from 'fastest-levenshtein';
import disposableList from '../blocklists/disposable_email_blocklist.json';

const commonDomains = [
  'gmail.com', 'hotmail.com', 'yahoo.com.br', 'uol.com.br',
  'icloud.com', 'protonmail.com', 'outlook.com', 'live.com'
];

export function suggestDomain(email: string): string | null {
  const [_, domain] = email.split('@');
  if (!domain) return null;

  let best = { domain: '', distance: Infinity };

  for (const candidate of [...commonDomains, ...disposableList]) {
    const d = distance(domain, candidate);
    if (d < best.distance) {
      best = { domain: candidate, distance: d };
    }
  }

  return best.distance <= 2 ? best.domain : null;
}
