// src/schemas/emailResultSchema.ts
import { object, string, boolean, number, nullable, optional } from 'superstruct';

export const EmailValidationResultSchema = object({
  status: number(),
  email: string(),
  normalized_email: string(),
  domain: string(),
  domain_age_in_days: nullable(number()),
  mx: boolean(),
  disposable: boolean(),
  public_domain: boolean(),
  relay_domain: boolean(),
  alias: boolean(),
  role_account: boolean(),
  did_you_mean: nullable(string()),
  blocklisted: boolean(),
  spam: boolean()
});

