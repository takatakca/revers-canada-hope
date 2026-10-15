/** A signed TAKATAK identity is necessary but not sufficient for case access.
 * Until TAKATAK supplies a dedicated administrative entitlement, operators
 * are explicitly delegated by the REVERS production operator using UUIDs.
 * This list is read only on the server and fails closed when unset.
 */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function canManageSupport(
  takatakIdentityId: string | null | undefined,
  delegatedIdentityIds: string | undefined,
): boolean {
  if (!takatakIdentityId || !UUID.test(takatakIdentityId) || !delegatedIdentityIds) {
    return false;
  }
  const id = takatakIdentityId.toLowerCase();
  return delegatedIdentityIds
    .split(",")
    .map((candidate) => candidate.trim().toLowerCase())
    .some((candidate) => UUID.test(candidate) && candidate === id);
}
