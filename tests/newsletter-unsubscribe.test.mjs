import assert from "node:assert/strict";
import test from "node:test";
import {
  createUnsubscribeToken,
  verifyUnsubscribeToken,
} from "../src/lib/newsletter/unsubscribe-token.ts";

const id = "cb1d6cef-e8a8-46c3-a175-02932261152b";
const secret = "unit-test-newsletter-signer-secret-at-least-32-bytes";

test("newsletter opt-out token is round-trippable without email disclosure", () => {
  const token = createUnsubscribeToken(id, secret);
  assert.equal(verifyUnsubscribeToken(token, secret), id);
  assert.ok(!token.includes("@"));
});

test("invalid or tampered tokens are rejected", () => {
  const token = createUnsubscribeToken(id, secret);
  assert.equal(verifyUnsubscribeToken(token + "x", secret), null);
  assert.equal(verifyUnsubscribeToken(token, secret + "-different"), null);
  assert.equal(verifyUnsubscribeToken(token, ""), null);
  assert.equal(verifyUnsubscribeToken(token, undefined), null);
  assert.equal(verifyUnsubscribeToken(token.replace(id, "invalid"), secret), null);
  assert.throws(() => createUnsubscribeToken(id, "short"));
  assert.throws(() => createUnsubscribeToken("invalid", secret));
});
