import validator from 'validator';

export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

export function isEmailSyntaxValid(email: string): boolean {
    return validator.isEmail(email);
}
