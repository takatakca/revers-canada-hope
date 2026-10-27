import assert from "node:assert/strict";
import test from "node:test";
import { releaseSha } from "../src/lib/release.ts";

const sha = "0123456789abcdef0123456789abcdef01234567";

test("MochaHost: RELEASE_SHA from the CURRENT pointer wins", () => {
  assert.equal(releaseSha({ RELEASE_SHA: ` ${sha} `, SOURCE_COMMIT: "f".repeat(40) }), sha);
});

test("Coolify: SOURCE_COMMIT when RELEASE_SHA is absent", () => {
  assert.equal(releaseSha({ SOURCE_COMMIT: sha.toUpperCase() }), sha);
});

test("no release, or a SOURCE_COMMIT that is not a full SHA: null", () => {
  assert.equal(releaseSha({}), null);
  assert.equal(releaseSha({ SOURCE_COMMIT: "unknown" }), null);
  assert.equal(releaseSha({ SOURCE_COMMIT: "0123456" }), null);
});
