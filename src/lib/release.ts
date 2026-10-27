// The commit this server runs, reported by /healthz and /readyz.
// MochaHost: app.js sets RELEASE_SHA from the CURRENT release pointer.
// Coolify: SOURCE_COMMIT ("include source commit in build" is on for the application). Only a full
// 40-character SHA is accepted, so a placeholder such as "unknown" is never reported as a release.
export function releaseSha(env: Record<string, string | undefined> = process.env): string | null {
  const fromMochaHost = env.RELEASE_SHA?.trim();
  if (fromMochaHost) return fromMochaHost;
  const fromCoolify = env.SOURCE_COMMIT?.trim().toLowerCase();
  return fromCoolify && /^[0-9a-f]{40}$/.test(fromCoolify) ? fromCoolify : null;
}
