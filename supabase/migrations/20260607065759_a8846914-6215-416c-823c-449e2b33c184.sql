
-- Tighten INSERT policies with input validation (replaces WITH CHECK true)
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contacts;
CREATE POLICY "Anyone can submit a contact message"
  ON public.contacts FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 200
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(message) BETWEEN 1 AND 5000
    AND (phone IS NULL OR char_length(phone) <= 50)
    AND (subject IS NULL OR char_length(subject) <= 300)
    AND language IN ('fr','en')
  );

DROP POLICY IF EXISTS "Anyone can sign up for the newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can sign up for the newsletter"
  ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND language IN ('fr','en')
    AND consent = true
  );

DROP POLICY IF EXISTS "Anyone can record a donation intent" ON public.donation_intents;
CREATE POLICY "Anyone can record a donation intent"
  ON public.donation_intents FOR INSERT TO anon, authenticated
  WITH CHECK (
    amount_cents > 0
    AND amount_cents <= 100000000
    AND currency IN ('CAD','USD')
    AND frequency IN ('one_time','monthly')
    AND language IN ('fr','en')
    AND status = 'pending_checkout'
    AND donor_email IS NULL
    AND donor_name IS NULL
    AND stripe_checkout_session_id IS NULL
    AND stripe_payment_intent_id IS NULL
    AND stripe_customer_id IS NULL
    AND paid_at IS NULL
  );

-- Defense-in-depth: explicit restrictive policies denying SELECT/UPDATE/DELETE
-- to anon and authenticated. service_role bypasses RLS for backend operations.
CREATE POLICY "Deny read to public roles" ON public.contacts
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Deny update to public roles" ON public.contacts
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny delete to public roles" ON public.contacts
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE POLICY "Deny read to public roles" ON public.newsletter_subscribers
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Deny update to public roles" ON public.newsletter_subscribers
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny delete to public roles" ON public.newsletter_subscribers
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE POLICY "Deny read to public roles" ON public.donation_intents
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Deny update to public roles" ON public.donation_intents
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny delete to public roles" ON public.donation_intents
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);
