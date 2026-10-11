import type { ResultEntry } from './demo';

// Preserve the UI response contract; this preview never invokes a provider.
type PreviewResponse =
  | { ok: true; reply: Pick<NonNullable<ResultEntry['ai']>, 'answer' | 'steps'> }
  | { ok: false; status: number; message: string };

export async function askIntelligence(_: unknown): Promise<PreviewResponse> {
  return { ok: false, status: 503, message: 'Web2: protótipo visual, IA não conectada.' };
}
