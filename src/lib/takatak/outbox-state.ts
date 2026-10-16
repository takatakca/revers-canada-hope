/**
 * An outbox delivery is only acknowledged once its state is durably saved.
 * Supabase may return an error OR an empty matched row; neither means success.
 * Keep this helper side-effect-free so failure modes can be tested without
 * production credentials.
 */
export function requireOutboxMutation(
  operation: string,
  result: {
    data: { id: string } | null;
    error: { message: string } | null;
  },
): void {
  if (result.error || !result.data?.id) {
    throw new Error(`Unable to persist TAKATAK outbox ${operation}.`);
  }
}

/** Bounded exponential retry, from 30s up to one hour. */
export function retryDelaySeconds(attempts: number): number {
  if (!Number.isSafeInteger(attempts) || attempts < 1) {
    throw new Error("Invalid TAKATAK outbox attempt count.");
  }
  return Math.min(3_600, 30 * 2 ** Math.min(16, attempts - 1));
}
