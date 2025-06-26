import { describe, it, expect, vi } from 'vitest';
import * as otmDetector from 'otm-detector';
import { checkOTM } from '../../src/validators/checkOTM';

vi.mock('otm-detector', () => ({
  isOneTimeMail: vi.fn()
}));

describe('checkOTM', () => {
  it('retorna true para domínios descartáveis detectados pelo otm-detector', async () => {
    (otmDetector.isOneTimeMail as any).mockResolvedValueOnce(true);
    const result = await checkOTM('mailinator.com');
    expect(result).toBe(true);
  });

  it('retorna false para domínios confiáveis', async () => {
    (otmDetector.isOneTimeMail as any).mockResolvedValueOnce(false);
    const result = await checkOTM('gmail.com');
    expect(result).toBe(false);
  });

  it('propaga erro caso o otm-detector falhe', async () => {
    (otmDetector.isOneTimeMail as any).mockRejectedValueOnce(new Error('falha de rede'));
    await expect(checkOTM('qualquer.com')).rejects.toThrow('falha de rede');
  });
});

