// Visual-only: no provider, credentials or remote service.
export async function askIntelligence(_: unknown) { return { ok: false as const, status: 503, message: 'Web2: protótipo visual, IA não conectada.' }; }
