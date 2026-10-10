-- REVERS ↔ TAKATAK bridge tables.
-- These are server-only operational bridge records. TAKATAK remains the
-- master identity authority; REVERS never reads TAKATAK tables directly.

CREATE TABLE public.revers_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  takatak_master_identity_id uuid NOT NULL UNIQUE,
  sync_status text NOT NULL DEFAULT 'linked'
    CHECK (sync_status IN ('linked','pending','error','revoked')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.takatak_outbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL UNIQUE,
  event_type text NOT NULL,
  version text NOT NULL DEFAULT '1',
  source_system text NOT NULL DEFAULT 'revers',
  source_workspace text,
  source_entity_type text NOT NULL,
  source_entity_id text NOT NULL,
  idempotency_key text NOT NULL UNIQUE,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','processing','delivered','retrying','failed')),
  attempts integer NOT NULL DEFAULT 0,
  last_error text,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  delivered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX takatak_outbox_delivery_idx
  ON public.takatak_outbox(status, next_attempt_at);
CREATE INDEX takatak_outbox_source_entity_idx
  ON public.takatak_outbox(source_entity_type, source_entity_id);

ALTER TABLE public.revers_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.takatak_outbox ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.revers_profiles FROM PUBLIC;
REVOKE ALL ON TABLE public.revers_profiles FROM anon;
REVOKE ALL ON TABLE public.revers_profiles FROM authenticated;

REVOKE ALL ON TABLE public.takatak_outbox FROM PUBLIC;
REVOKE ALL ON TABLE public.takatak_outbox FROM anon;
REVOKE ALL ON TABLE public.takatak_outbox FROM authenticated;

GRANT SELECT, INSERT, UPDATE ON TABLE public.revers_profiles TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.takatak_outbox TO service_role;

CREATE OR REPLACE FUNCTION public.set_revers_takatak_bridge_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS revers_profiles_updated_at ON public.revers_profiles;
CREATE TRIGGER revers_profiles_updated_at
BEFORE UPDATE ON public.revers_profiles
FOR EACH ROW EXECUTE FUNCTION public.set_revers_takatak_bridge_updated_at();

DROP TRIGGER IF EXISTS takatak_outbox_updated_at ON public.takatak_outbox;
CREATE TRIGGER takatak_outbox_updated_at
BEFORE UPDATE ON public.takatak_outbox
FOR EACH ROW EXECUTE FUNCTION public.set_revers_takatak_bridge_updated_at();
