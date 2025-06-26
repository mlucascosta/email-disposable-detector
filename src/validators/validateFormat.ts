import isEmail from 'validator/lib/isEmail';

export function isValidFormat(email: string): boolean {
  return typeof email === 'string' && isEmail(email, { require_tld: true });
}

