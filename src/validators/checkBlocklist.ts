import fs from 'node:fs';
import path from 'node:path';

const blocklistPath = path.resolve(__dirname, '../../disposable_email_blocklist.json');

let blocklist: Set<string> | null = null;

function loadBlocklist(): Set<string> {
  if (!blocklist) {
    const raw = fs.readFileSync(blocklistPath, 'utf-8');
    const domains: string[] = JSON.parse(raw);
    blocklist = new Set(domains.map(domain => domain.toLowerCase()));
  }
  return blocklist;
}

export function isInBlocklist(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  const list = loadBlocklist();
  return list.has(domain);
}
