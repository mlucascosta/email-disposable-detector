const ROLE_ACCOUNTS = ['info', 'admin', 'contato', 'support', 'suporte', 'sales', 'help'];
const PUBLIC_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'live.com', 'msn.com'];
const RELAY_DOMAINS = ['anonaddy.com', '33mail.com', 'simplelogin.com'];

export function isAliasEmail(email: string): boolean {
  return email.split('@')[0].includes('+');
}

export function isRoleAccount(email: string): boolean {
  const local = email.split('@')[0].toLowerCase();
  return ROLE_ACCOUNTS.includes(local);
}

export function isPublicDomain(domain: string): boolean {
  return PUBLIC_DOMAINS.includes(domain.toLowerCase());
}

export function isRelayDomain(domain: string): boolean {
  return RELAY_DOMAINS.includes(domain.toLowerCase());
}

