-- REVERS recurring donations: one immutable Stripe invoice identity per renewal.
-- Apply ONLY to the operational REVERS Supabase project after verifying history.
-- Stripe is the payment authority. This ledger has no public Data API access.
ALTER TABLE public.donation_intents
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
  ADD COLUMN IF NOT EXISTS subscription_status text;

CREATE UNIQUE INDEX IF NOT EXISTS revers_donation_subscription_unique
  ON public.donation_intents (stripe_subscription_id)
  WHERE stripe_subscription_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.revers_recurring_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_intent_id uuid NOT NULL REFERENCES public.donation_intents(id) ON DELETE RESTRICT,
  stripe_invoice_id text NOT NULL UNIQUE,
  stripe_subscription_id text NOT NULL,
  stripe_event_id text NOT NULL,
  currency text NOT NULL CHECK (currency = 'CAD'),
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  status text NOT NULL CHECK (status IN ('paid', 'failed')),
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT recurring_paid_at_check CHECK (status <> 'paid' OR paid_at IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS revers_recurring_invoices_intent_idx
 ON public.revers_recurring_invoices(donation_intent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS revers_recurring_invoices_subscription_idx
 ON public.revers_recurring_invoices(stripe_subscription_id);

ALTER TABLE public.revers_recurring_invoices ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.revers_recurring_invoices FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.revers_recurring_invoices TO service_role;

-- Separate from initial payment status so cancellation does not undo a paid gift.
COMMENT ON COLUMN public.donation_intents.subscription_status IS
  'Stripe subscription lifecycle; not equivalent to initial donation payment status';
COMMENT ON TABLE public.revers_recurring_invoices IS
  'Server-only, per-invoice idempotent Stripe recurring donations; never a tax receipt';
