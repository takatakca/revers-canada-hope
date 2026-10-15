import assert from "node:assert/strict";
import test from "node:test";
import {
  invoiceSubscriptionId,
  matchesMonthlyInvoice,
  validFailedMonthlyInvoice,
} from "../src/lib/stripe/recurring.ts";

const paid = {
  id: "in_test123",
  parent: { type: "subscription_details", subscription_details: { subscription: "sub_test123" } },
  currency: "cad",
  amount_paid: 5000,
  amount_due: 5000,
  paid: true,
  status: "paid",
};

test("Stripe Basil+ parent identifies correct recurring subscription", () => {
  assert.equal(invoiceSubscriptionId(paid), "sub_test123");
  assert.equal(invoiceSubscriptionId({ ...paid, parent: undefined, subscription: "sub_old" }), "sub_old");
  assert.equal(invoiceSubscriptionId({ ...paid, parent: { type: "invoiceitem_details" } }), null);
});

test("only fully paid matching monthly charges are accepted", () => {
  assert.equal(matchesMonthlyInvoice(paid, 5000, "CAD"), true);
  assert.equal(matchesMonthlyInvoice({ ...paid, status: "open" }, 5000, "CAD"), false);
  assert.equal(matchesMonthlyInvoice({ ...paid, paid: false }, 5000, "CAD"), false);
  assert.equal(matchesMonthlyInvoice({ ...paid, amount_paid: 0 }, 5000, "CAD"), false);
  assert.equal(matchesMonthlyInvoice({ ...paid, amount_paid: 5500 }, 5000, "CAD"), false);
  assert.equal(matchesMonthlyInvoice({ ...paid, currency: "usd" }, 5000, "CAD"), false);
  assert.equal(matchesMonthlyInvoice({ ...paid, id: "bad" }, 5000, "CAD"), false);
});

test("failed invoices are only recorded for positive Canadian dollar amounts", () => {
  assert.equal(validFailedMonthlyInvoice(paid), true);
  assert.equal(validFailedMonthlyInvoice({ ...paid, amount_due: 0 }), false);
  assert.equal(validFailedMonthlyInvoice({ ...paid, currency: "usd" }), false);
});
