-- REVERS operational support status audit. Apply ONLY to REVERS Supabase,
-- after the baseline contacts schema and server-only form-write migration.
-- No case text, email, phone or child data is copied into this audit log.
BEGIN;

CREATE TABLE public.revers_support_status_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL REFERENCES public.contacts(id) ON DELETE RESTRICT,
  previous_status text NOT NULL CHECK (previous_status IN ('new','reviewed','archived')),
  new_status text NOT NULL CHECK (new_status IN ('new','reviewed','archived')),
  actor_takatak_identity_id uuid NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT revers_support_audit_status_changed CHECK (previous_status <> new_status)
);

CREATE INDEX revers_support_audit_by_contact
  ON public.revers_support_status_audit (contact_id, changed_at DESC);

ALTER TABLE public.revers_support_status_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.revers_support_status_audit FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.revers_support_status_audit TO service_role;

-- Entire status change + audit insert happen in ONE database transaction.
-- Invoker permissions only; service_role is the sole granted caller. The
-- application first verifies a signed TAKATAK REVERS session AND delegated
-- REVERS operator identity on every call. No bypass-RLS definer function.
CREATE FUNCTION public.revers_transition_support_status(
  p_contact_id uuid,
  p_expected_status text,
  p_new_status text,
  p_actor_takatak_identity_id uuid
)
RETURNS TABLE (contact_id uuid, status text)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  updated_id uuid;
  updated_status text;
BEGIN
  IF p_actor_takatak_identity_id IS NULL OR
     p_expected_status NOT IN ('new','reviewed','archived') OR
     p_new_status NOT IN ('new','reviewed','archived') OR
     p_new_status = p_expected_status THEN
    RAISE EXCEPTION 'invalid support status transition'
      USING ERRCODE = '22023';
  END IF;

  UPDATE public.contacts AS c
     SET status = p_new_status
   WHERE c.id = p_contact_id
     AND c.source = 'REVERS_CANADA_GAR'
     AND c.status = p_expected_status
   RETURNING c.id, c.status INTO updated_id, updated_status;

  IF NOT FOUND THEN
    RETURN; -- stale status / wrong tenant / missing contact = conflict
  END IF;

  INSERT INTO public.revers_support_status_audit
    (contact_id, previous_status, new_status, actor_takatak_identity_id)
  VALUES
    (updated_id, p_expected_status, p_new_status, p_actor_takatak_identity_id);

  RETURN QUERY SELECT updated_id, updated_status;
END;
$$;

REVOKE ALL ON FUNCTION public.revers_transition_support_status(uuid,text,text,uuid)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.revers_transition_support_status(uuid,text,text,uuid)
  TO service_role;

COMMIT;
