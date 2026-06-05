
ALTER TABLE public.donation_intents
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- Service role full access (used by server fn + webhook)
GRANT SELECT, INSERT, UPDATE ON public.donation_intents TO service_role;
