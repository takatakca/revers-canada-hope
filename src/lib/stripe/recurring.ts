/** Minimal Stripe invoice shape, tolerant of legacy and Basil+ webhook payloads. */
export type RecurringInvoice = {
  id: string;
  currency: string | null;
  amount_paid: number;
  amount_due: number;
  paid: boolean;
  status: string | null;
  subscription?: string | { id: string } | null;
  parent?: { type?: string; subscription_details?: {
    subscription?: string | { id: string } | null
  } | null } | null;
  status_transitions?: { paid_at?: number | null } | null;
};

export function invoiceSubscriptionId(invoice: RecurringInvoice): string | null {
  const parent = invoice.parent;
  const ref = parent?.type === "subscription_details"
    ? parent.subscription_details?.subscription
    : invoice.subscription;
  if (typeof ref === "string") return ref.startsWith("sub_") ? ref : null;
  if (ref && typeof ref.id === "string" && ref.id.startsWith("sub_")) return ref.id;
  return null;
}

/** No invoices with zero amount, different currency or mismatched monthly amount count as donations. */
export function matchesMonthlyInvoice(
  invoice: RecurringInvoice,
  expectedAmountCents: number,
  expectedCurrency: string,
): boolean {
  return (
    invoice.id.startsWith("in_") &&
    invoice.status === "paid" &&
    invoice.paid === true &&
    Number.isSafeInteger(expectedAmountCents) &&
    expectedAmountCents > 0 &&
    Number.isSafeInteger(invoice.amount_paid) &&
    invoice.amount_paid === expectedAmountCents &&
    invoice.currency?.toUpperCase() === expectedCurrency.toUpperCase() &&
    Boolean(invoiceSubscriptionId(invoice))
  );
}

export function validFailedMonthlyInvoice(invoice: RecurringInvoice): boolean {
  return (
    invoice.id.startsWith("in_") &&
    Boolean(invoiceSubscriptionId(invoice)) &&
    Number.isSafeInteger(invoice.amount_due) &&
    invoice.amount_due > 0 &&
    invoice.currency?.toUpperCase() === "CAD"
  );
}
