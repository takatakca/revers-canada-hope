-- REVERS public form writes now use authenticated server handlers with a service-role key.
-- IMPORTANT: Apply only to the REVERS operational Supabase database and verify
-- contact/newsletter/donation server submissions first. No public cross-tenant grants.
BEGIN;

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contacts;
DROP POLICY IF EXISTS "Anyone can sign up for the newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can record a donation intent" ON public.donation_intents;

REVOKE INSERT, SELECT, UPDATE, DELETE ON TABLE public.contacts FROM anon, authenticated;
REVOKE INSERT, SELECT, UPDATE, DELETE ON TABLE public.newsletter_subscribers FROM anon, authenticated;
REVOKE INSERT, SELECT, UPDATE, DELETE ON TABLE public.donation_intents FROM anon, authenticated;

-- Service-role is the only current application writer for these operational records.
GRANT SELECT, INSERT, UPDATE ON TABLE public.contacts TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.newsletter_subscribers TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.donation_intents TO service_role;

COMMIT;
