export interface EmailValidationResult {
  status: number;
  email: string;
  normalized_email: string;
  domain: string;
  domain_age_in_days: number | null;
  mx: boolean;
  disposable: boolean;
  public_domain: boolean;
  relay_domain: boolean;
  alias: boolean;
  role_account: boolean;
  did_you_mean: string | null;
  blocklisted: boolean;
  spam: boolean;
}

