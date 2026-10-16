import assert from "node:assert/strict";
import test from "node:test";

import { requireOutboxMutation, retryDelaySeconds } from "../src/lib/takatak/outbox-state.ts";

test("outbox acknowledges only a persisted matching row", () => {
  assert.doesNotThrow(() =>
    requireOutboxMutation("ack", { data: { id: "some-event" }, error: null }),
  );
  assert.throws(
    () => requireOutboxMutation("ack", { data: null, error: null }),
    /Unable to persist TAKATAK outbox ack/,
  );
  assert.throws(
    () =>
      requireOutboxMutation("retry", {
        data: { id: "some-event" },
        error: { message: "Database unavailable" },
      }),
    /Unable to persist TAKATAK outbox retry/,
  );
});

test("outbox retry delays are bounded and reject invalid attempts", () => {
  assert.equal(retryDelaySeconds(1), 30);
  assert.equal(retryDelaySeconds(2), 60);
  assert.equal(retryDelaySeconds(3), 120);
  assert.equal(retryDelaySeconds(8), 3_600);
  assert.equal(retryDelaySeconds(1_000), 3_600);
  assert.throws(() => retryDelaySeconds(0));
  assert.throws(() => retryDelaySeconds(-1));
  assert.throws(() => retryDelaySeconds(Number.NaN));
});
