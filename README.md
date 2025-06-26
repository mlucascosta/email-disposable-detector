# 📬 email-disposable-detector

Validador de e-mails descartáveis gratuito, completo e extensível — detecta e-mails temporários e suspeitos utilizando fontes públicas como listas GitHub, `isOneTimeMail`, `disify`, `debounce.io`, `validator.pizza`, `rapid-email-verifier`, e muito mais.

## ✨ Principais recursos

- Verificação de formato com `validator`
- Lista pública offline de domínios descartáveis
- Fallback com múltiplas APIs gratuitas
- Heurísticas (`role`, `alias`, `public_domain`)
- Enriquecimento com WHOIS, RDAP e DNS
- Correção automática de digitação (`did_you_mean`)
- Totalmente em **TypeScript**
- Validado com `superstruct`
- Testado com `vitest`
- Pronto para CLI e para ser usado como biblioteca

---

## 📦 Instalação

```bash
npm install email-disposable-detector
```

---

## 🧪 Exemplo de uso

```ts
import { validateEmailFull } from 'email-disposable-detector';

const result = await validateEmailFull('joao@gmaill.com');

console.log(result);
/*
{
  status: 200,
  email: 'joao@gmaill.com',
  normalized_email: 'joao@gmaill.com',
  domain: 'gmaill.com',
  domain_age_in_days: null,
  mx: false,
  disposable: false,
  public_domain: false,
  relay_domain: false,
  alias: false,
  role_account: false,
  did_you_mean: 'gmail.com',
  blocklisted: false,
  spam: false
}
*/
```

---

## 🧠 Quando usar

- Validação segura de e-mails em cadastros
- Bloqueio de e-mails temporários (Mailinator, 10minutemail, etc.)
- Prevenção de fraudes, spam e abuso
- Sugestão de correções em digitações erradas

---

## 📚 Fontes utilizadas

- [`disposable-email-domains`](https://github.com/disposable-email-domains/disposable-email-domains)
- [`otm-detector`](https://www.npmjs.com/package/otm-detector)
- [`disify`](https://www.disify.com/)
- [`debounce.io`](https://disposable.debounce.io/)
- [`validator.pizza`](https://www.validator.pizza/)
- [`fastest-levenshtein`](https://www.npmjs.com/package/fastest-levenshtein)
- [`whoiser`](https://www.npmjs.com/package/whoiser)
- `DNS` e `RDAP` consultas públicas

---

## ✅ License

MIT © [Mario Costa]
