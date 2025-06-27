# 📧 email-disposable-detector

Validador robusto e gratuito de e-mails descartáveis (disposable) e inválidos, com múltiplas fontes externas e lógica própria. Ideal para aplicações que precisam garantir qualidade de cadastro e mitigar spam.

---

## 🚀 Visão Geral

Este pacote TypeScript/NPM realiza a validação completa de um endereço de e-mail utilizando as seguintes etapas:

1. **Normalização e verificação de sintaxe**
2. **Validação técnica com API principal gratuita (Rapid Email Verifier)**
3. **Consulta ao RDAP para obter informações detalhadas do domínio**
4. **Verificação se o domínio é descartável** (via múltiplas fontes)
5. **Sugestão de correção de domínio com Levenshtein**
6. **Resultado final estruturado com score, status e riscos**

---

## 🔧 Tecnologias e Serviços Utilizados

| Fonte / Biblioteca | Função | Status |
|--------------------|--------|--------|
| [`rapid-email-verifier`](https://rapid-email-verifier.fly.dev) | Validação principal (sintaxe, domínio, MX, caixa postal, role-based) | ✅ Gratuita |
| [`otm-detector`](https://github.com/Short-io/otm-detector) | Verificação de domínio descartável via base própria | ✅ Open Source |
| [`Debounce`](https://disposable.debounce.io) | Verificação extra de domínio descartável | ✅ Gratuita |
| [`Disify`](https://www.disify.com/) | Verificação extra de domínio descartável | ✅ Gratuita |
| [`Validator.pizza`](https://www.validator.pizza) | Último fallback para detectar e-mails inválidos | ✅ Gratuita |
| [`rdap.org`](https://rdap.org/) | Consulta ao RDAP para metadados do domínio (como data de criação) | ✅ Gratuita |
| [`tldts`](https://www.npmjs.com/package/tldts) | Parsing confiável do domínio | ✅ |
| [`fastest-levenshtein`](https://www.npmjs.com/package/fastest-levenshtein) | Correção de domínios comuns | ✅ |

---

## ⚠️ Atenção

- Este projeto **não depende de WHOIS tradicional**, mas sim de **RDAP** (protocolo moderno recomendado pelo ICANN).
- As **APIs externas gratuitas podem falhar ou limitar chamadas** em grande escala. Em caso de erro, o sistema continua com os dados locais.
- A **verificação de e-mails descartáveis não se apoia apenas na API principal**, por isso pode retornar resultados diferentes (mais confiáveis).

---

## 📥 Instalação

```bash
npm install email-disposable-detector
```

Ou, se for clonar o projeto:
```bash
git clone https://github.com/mlucascosta/email-disposable-detector.git
cd email-disposable-detector
npm install
```

### Como usar o cli
```bash
npx ts-node cli.ts email@exemplo.com
```

### 🧩 Como usar (em código)
```node
import { validateEmailFull } from './src/core/validateEmailFull';

const resultado = await validateEmailFull('teste@example.com');

console.log(resultado);
```

### Exemplo de resposta:
```json
{
  "status": 200,
  "email": "teste@example.com",
  "normalized_email": "teste@example.com",
  "domain": "example.com",
  "mx": true,
  "syntax": true,
  "domain_exists": true,
  "mailbox_exists": true,
  "score": 95,
  "is_role_account": false,
  "disposable": false,
  "blocklisted": false,
  "rdap_info": {
    "createdDate": "1997-08-22T04:00:00Z",
    "nameservers": ["NS1.EXAMPLE.COM", "NS2.EXAMPLE.COM"],
    "status": ["client update prohibited"]
  },
  "did_you_mean": null
}
```

### 💬 Contribua
Pull requests são bem-vindos! Para ideias ou correções, abra uma issue.

---

