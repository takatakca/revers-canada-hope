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
