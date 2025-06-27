import axios from 'axios';
import { getDomainRDAPInfo } from '../enrichers/checkRDAP';
import { checkDisposableSources } from '../validators/checkDisposable';
import { suggestDomain } from '../utils/suggestDomain';
import { normalizeEmail } from '../utils/emailUtils';

export interface EmailValidationResult {
    status: number;
    email: string;
    normalized_email: string;
    domain: string;
    mx: boolean;
    syntax: boolean;
    domain_exists: boolean;
    mailbox_exists: boolean;
    score: number;
    is_role_account: boolean;
    disposable: boolean;
    blocklisted: boolean;
    rdap_info?: any;
    did_you_mean?: string | null;
}

export async function validateEmailFull(email: string): Promise<EmailValidationResult> {
    const normalized = normalizeEmail(email);
    const domain = normalized.split('@')[1];

    try {
        // Etapa 1: API principal (Rapid Email Verifier)
        const { data: mainResult } = await axios.get(`https://rapid-email-verifier.fly.dev/api/validate?email=${normalized}`);
        const validations = mainResult?.validations ?? {};

        // Etapa 2: RDAP
        const rdapInfo = await getDomainRDAPInfo(domain);

        // Etapa 3: Verificação de fontes para e-mail descartável
        const isDisposable = await checkDisposableSources(normalized);

        // Etapa 4: Sugestão de domínio
        const suggestion = suggestDomain(normalized);

        const result: EmailValidationResult = {
            status: 200,
            email,
            normalized_email: normalized,
            domain,
            mx: validations.mx_records ?? false,
            syntax: validations.syntax ?? false,
            domain_exists: validations.domain_exists ?? false,
            mailbox_exists: validations.mailbox_exists ?? false,
            score: mainResult?.score ?? 0,
            is_role_account: validations.is_role_based ?? false,
            disposable: isDisposable,
            blocklisted: false, // será implementado depois
            rdap_info: rdapInfo,
            did_you_mean: suggestion,
        };

        return result;

    } catch (err: any) {
        console.error('[validateEmailFull] Erro ao validar e-mail:', err.message || err);
        throw new Error('Erro ao validar e-mail.');
    }
}
