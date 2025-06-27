import axios from 'axios';

export interface FallbackResult {
  disposable: boolean;
  spam: boolean;
  sources: string[];
}

export async function checkFallbacks(email: string): Promise<FallbackResult> {
  const results: FallbackResult = {
    disposable: false,
    spam: false,
    sources: [],
  };

  const services = [
    {
      name: 'disify',
      url: `https://www.disify.com/api/email/${email}`,
      process: (data: any) => ({
        disposable: data.disposable,
        spam: data.spam || false,
      }),
    },
    {
      name: 'debounce',
      url: `https://disposable.debounce.io/?email=${email}`,
      process: (data: any) => ({
        disposable: data.disposable === 'true',
        spam: false,
      }),
    },
    {
      name: 'validator.pizza',
      url: `https://www.validator.pizza/email/${email}`,
      process: (data: any) => ({
        disposable: data.disposable || false,
        spam: false,
      }),
    },
  ];

  for (const service of services) {
    try {
      const res = await axios.get(service.url, { timeout: 5000 });
      const { disposable, spam } = service.process(res.data);

      if (disposable) results.disposable = true;
      if (spam) results.spam = true;
      results.sources.push(service.name);
    } catch (err) {
      console.warn(`[checkFallbacks] falha em ${service.name}:`, err.message);
    }
  }

  return results;
}

