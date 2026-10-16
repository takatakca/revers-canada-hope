import assert from "node:assert/strict";
import test from "node:test";
import { canManageSupport } from "../src/lib/support/access.ts";

const operator = "95c8355e-8ce1-477e-9b97-65c1f90bc107";
const stranger = "d2511440-95cf-464e-bf4c-e678841e574e";

test("support access fails closed unless explicitly delegated", () => {
  assert.equal(canManageSupport(operator, undefined), false);
  assert.equal(canManageSupport(operator, ""), false);
  assert.equal(canManageSupport(stranger, operator), false);
  assert.equal(canManageSupport(null, operator), false);
  assert.equal(canManageSupport("admin", "admin"), false);
});

test("only an exact verified TAKATAK UUID can be delegated", () => {
  assert.equal(canManageSupport(operator, operator), true);
  assert.equal(canManageSupport(operator.toUpperCase(), ` ${stranger}, ${operator} `), true);
  assert.equal(canManageSupport(operator, `${operator}more`), false);
  assert.equal(canManageSupport(operator, `bad,${stranger}`), false);
});

test("support audit migration has no public DML and uses invoker SQL", async () => {
  // Static smoke guard only; a live Postgres transaction test is required
  // after the correct REVERS operational database is connected.
  const { readFile } = await import("node:fs/promises");
  const sql = await readFile(new URL("../supabase/migrations/20261015235500_support_status_audit.sql", import.meta.url), "utf8");
  assert.match(sql, /SECURITY INVOKER/);
  assert.match(sql, /REVOKE ALL ON FUNCTION public\.revers_transition_support_status/);
  assert.match(sql, /GRANT EXECUTE ON FUNCTION public\.revers_transition_support_status[\s\S]+TO service_role/);
  assert.match(sql, /UPDATE public\.contacts AS c[\s\S]+INSERT INTO public\.revers_support_status_audit/);
  assert.match(sql, /ENABLE ROW LEVEL SECURITY/);
});
