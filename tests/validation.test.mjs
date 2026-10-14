import test from "node:test";
import assert from "node:assert/strict";
import {
  validateDonationAmount,
  validateEmail,
  validateRequired,
  sanitizeText,
  FIELD_LIMITS,
} from "../src/lib/validation.ts";

test("CAD donations accept integer and cent-denominated amounts", () => {
  for (const amount of [1, "1", 1.01, "1.01", 25, "100.99", 1000000]) {
    assert.equal(validateDonationAmount(amount), true, String(amount));
  }
});

test("CAD donations reject sub-cent rounding, exponents and overflow", () => {
  for (const amount of [
    0,
    0.5,
    "0.99",
    -1,
    "1.001",
    "1e3",
    "0x10",
    "Infinity",
    NaN,
    Infinity,
    "1,000",
    true,
    null,
    {},
    "",
    " ",
    "1000000.01",
  ]) {
    assert.equal(validateDonationAmount(amount), false, String(amount));
  }
});

test("email and required field validation", () => {
  assert.equal(validateEmail("parent@example.com"), true);
  assert.equal(validateEmail("invalid"), false);
  assert.equal(validateEmail("a".repeat(FIELD_LIMITS.email + 1) + "@mail.ca"), false);
  assert.equal(validateRequired("  "), false);
  assert.equal(validateRequired(" Support "), true);
});

test("text normalization removes controls and clamps size", () => {
  assert.equal(sanitizeText("  Hello\nworld\u0000  ", 30), "Hello world");
  assert.equal(sanitizeText("abcdef", 3), "abc");
});
