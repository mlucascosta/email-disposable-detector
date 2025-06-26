import { distance } from 'fastest-levenshtein';

const KNOWN_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'protonmail.com',
  'aol.com',
  'gmx.com',
  'msn.com',
];

export function suggestDomain(input: string, threshold = 2): string | null {
  let suggestion: string | null = null;
  let minDist = Infinity;

  for (const known of KNOWN_DOMAINS) {
    const dist = distance(input, known);
    if (dist <= threshold && dist < minDist) {
      minDist = dist;
      suggestion = known;
    }
  }

  return suggestion;
}

