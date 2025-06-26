import { isValidFormat } from './validators/validateFormat';
import { isInBlocklist } from './validators/checkBlocklist';
import { isOneTimeMail as checkOTM } from './validators/checkOTM';
import { checkFallbacks } from './validators/checkFallbacks';
import { getMXStatus, getDomainAgeInDays, isBlocklisted as isDomainBlocklisted } from './enrichers/domainInfo';
import { suggestDomain } from './utils/suggestDomain';
import { validate, object, string, boolean, number, nullable } from 'superstruct';

export const EmailValidationResult = object({
  status: number(),
  email: string(),
  normalized_email: string(),
  domain: string(),
  domain_age_in_days: nullable(number()),
  mx: boolean(),
  disposable: boolean(),
  public_domain: boolean(), // default false
  relay_domain: boolean(),  // default false
  alias: boolean(),         // default false
  role_account: boolean(),  // default false
  did_you_mean: nullable(string()),
  blocklisted: boolean(),
  spam: boolean(),
});

export type EmailValidationResult = typeof EmailValidationResult.TYPE;

export async function validateEmailFull(email: string): Promise<EmailValidationResult> {
  const normalized = email.trim().toLowerCase();
  const domain = normalized.split('@')[1];

  const [
    formatValid,
    inBlocklist,
    isOTM,
    fallback,
    mx,
    age,
    domainBlocked
  ] = await Promise.all([
    isValidFormat(normalized),
    isInBlocklist(normalized),
    checkOTM(normalized),
    checkFallbacks(normalized),
    getMXStatus(domain),
    getDomainAgeInDays(domain),
    isDomainBlocklisted(domain),
  ]);

  const suggestion = suggestDomain(normalized);

  const result = {
    status: 200,
    email,
    normalized_email: normalized,
    domain,
    domain_age_in_days: age,
    mx,
    disposable: isOTM || fallback.disposable,
    public_domain: false, // ainda não implementado
    relay_domain: false,  // ainda não implementado
    alias: false,         // ainda não implementado
    role_account: false,  // ainda não implementado
    did_you_mean: suggestion,
    blocklisted: inBlocklist || domainBlocked,
    spam: fallback.spam,
  };

  // Garante a estrutura com superstruct
  const [err, valid] = validate(result, EmailValidationResult);

  if (err) {
    throw new Error(`Invalid email validation result structure: ${err.message}`);
  }

  return valid;
}

