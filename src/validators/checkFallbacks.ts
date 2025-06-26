import axios from 'axios';

type FallbackResponse = {
  disposable: boolean;
  spam: boolean;
  mx: boolean | null;
  domain_age_in_days: number | null;
};

const SERVICES = [
  (email: string) => `https://www.disify.com/api/email/${email}`,
  (email: string) => `https://disposable.debounce.io/?email=${email}`,
  (email: string) => `https://rapid-email-verifier.fly.dev/api/validate?email=${email}`,
  (email: string) => `https://www.validator.pizza/email/${email}`,
  (email: string) => `https://api.disposable-email-detector.com/api/dea/v1/check/${email}`
];

export async function checkFallbacks(email: string): Promise<FallbackResponse> {
  let disposable = false;
  let spam = false;
  let mx: boolean | null = null;
  let domain_age_in_days: number | null = null;

  const checks = SERVICES.map(fn => {
    const url = fn(email);
    return axios.get(url, { timeout: 5000 }).then(res => res.data).catch(() => ({}));
  });

  const results = await Promise.allSettled(checks);

  for (const res of results) {
    if (res.status === 'fulfilled') {
      const data = res.value;
      if (data?.disposable === true || data?.disposable === 'true') disposable = true;
      if (data?.spam === true || data?.spam === 'true') spam = true;
      if (data?.mx !== undefined && mx === null) mx = !!data.mx;
      if (data?.domain_age !== undefined && domain_age_in_days === null) {
        domain_age_in_days = parseInt(data.domain_age) || null;
      }
    }
  }

  return { disposable, spam, mx, domain_age_in_days };
}

