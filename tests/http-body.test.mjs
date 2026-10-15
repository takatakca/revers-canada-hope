import assert from "node:assert/strict";
import test from "node:test";
import { readLimitedBody } from "../src/lib/http/read-limited-body.ts";

const request = (body) => new Request("https://reverscanada.ca/api/contact", {
  method: "POST",
  body,
});

test("accepts bodies exactly at the public API limit", async () => {
  assert.equal(await readLimitedBody(request("12345678"), 8), "12345678");
});

test("rejects excessive bodies without parsing them", async () => {
  assert.equal(await readLimitedBody(request("123456789"), 8), null);
});

test("handles missing content and Unicode by byte size", async () => {
  const empty = new Request("https://reverscanada.ca/api/contact");
  assert.equal(await readLimitedBody(empty, 10), null);
  assert.equal(await readLimitedBody(request("ééé"), 5), null);
  assert.equal(await readLimitedBody(request("ééé"), 6), "ééé");
});

test("invalid body limits fail closed", async () => {
  await assert.rejects(readLimitedBody(request("a"), 0), /Invalid request body limit/);
});
