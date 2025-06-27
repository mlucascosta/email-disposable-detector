import axios from 'axios';
import { isOneTimeMail } from 'otm-detector';
import disposableList from '../blocklists/disposable_email_blocklist.json';

/**
 * Verifica se o e-mail pertence a um domínio descartável.
 * Prioriza lista local e o pacote `otm-detector`, com fallback para APIs gratuitas.
 */
export async function checkDisposableSources(email: string): Promise<boolean> {
  const domain = email.split('@')[1]?.toLowerCase();

  if (!domain) return false;

  // Etapa 1: Verificação na lista local
  if (disposableList.includes(domain)) {
    return true;
  }

  // Etapa 2: Verificação com otm-detector (principal)
  try {
    const result = await isOneTimeMail(domain);
    if (result === true) return true;
  } catch (err) {
    console.warn('[checkDisposableSources] Erro no otm-detector, tentando fallback externo...');
  }

  // Etapa 3: Fallback com Debounce e Disify
  try {
    const [debounce, disify] = await Promise.all([
      axios.get(`https://disposable.debounce.io/?email=${email}`),
      axios.get(`https://www.disify.com/api/email/${email}`)
    ]);

    const isDisposable =
        debounce.data?.disposable === 'true' ||
        disify.data?.disposable === true;

    if (isDisposable) return true;
  } catch (err) {
    console.warn('[checkDisposableSources] Fallbacks Debounce/Disify falharam, tentando Validator.pizza...');
  }

  // Etapa 4: Último fallback - Validator.pizza
  try {
    const pizza = await axios.get(`https://www.validator.pizza/email/${email}`);
    return pizza.data?.status === 'invalid';
  } catch (err) {
    console.warn('[checkDisposableSources] Todas as fontes falharam. Considerando como não descartável.');
    return false;
  }

  // Caso nenhuma etapa retorne true, considera-se não descartável
  return false;
}
