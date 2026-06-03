
-- =========================
-- contacts
-- =========================
CREATE TABLE public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  language text NOT NULL DEFAULT 'fr',
  source text NOT NULL DEFAULT 'REVERS_CANADA_GAR',
  status text NOT NULL DEFAULT 'new',
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contacts_message_not_empty CHECK (length(btrim(message)) > 0),
  CONSTRAINT contacts_email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  CONSTRAINT contacts_status_valid CHECK (status IN ('new','reviewed','archived'))
);

GRANT INSERT ON public.contacts TO anon, authenticated;
GRANT ALL ON public.contacts TO service_role;

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON public.contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- TODO(admin-portal): add SELECT/UPDATE policies scoped to an admin role.

-- =========================
-- newsletter_subscribers
-- =========================
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  language text NOT NULL DEFAULT 'fr',
  source text NOT NULL DEFAULT 'REVERS_CANADA_GAR',
  consent boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'pending',
  provider text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  CONSTRAINT newsletter_status_valid CHECK (status IN ('pending','subscribed','unsubscribed','bounced'))
);

GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for the newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- TODO(admin-portal): add SELECT/UPDATE policies scoped to an admin role.

-- =========================
-- donation_intents
-- =========================
CREATE TABLE public.donation_intents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'CAD',
  frequency text NOT NULL DEFAULT 'one_time',
  language text NOT NULL DEFAULT 'fr',
  source text NOT NULL DEFAULT 'REVERS_CANADA_GAR',
  status text NOT NULL DEFAULT 'pending_checkout',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  donor_email text,
  donor_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT donation_amount_positive CHECK (amount_cents > 0),
  CONSTRAINT donation_frequency_valid CHECK (frequency IN ('one_time','monthly')),
  CONSTRAINT donation_status_valid CHECK (status IN ('pending_checkout','checkout_created','paid','failed','cancelled'))
);

GRANT INSERT ON public.donation_intents TO anon, authenticated;
GRANT ALL ON public.donation_intents TO service_role;

ALTER TABLE public.donation_intents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a donation intent"
  ON public.donation_intents FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- TODO(admin-portal): add SELECT/UPDATE policies scoped to an admin role.

-- =========================
-- updated_at trigger (shared)
-- =========================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER newsletter_set_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER donation_set_updated_at
  BEFORE UPDATE ON public.donation_intents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
