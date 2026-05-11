
-- site_settings: flexible jsonb-keyed config
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE TRIGGER trg_site_settings_touch BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- apk_versions
CREATE TABLE public.apk_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL UNIQUE,
  file_path text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  changelog text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT false,
  released_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.apk_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read apk versions" ON public.apk_versions FOR SELECT USING (true);
CREATE INDEX idx_apk_versions_active ON public.apk_versions(is_active) WHERE is_active = true;

-- admin_audit_log
CREATE TABLE public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  actor_ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
-- No public policies: only service role can read/write.
CREATE INDEX idx_admin_audit_created ON public.admin_audit_log(created_at DESC);

-- translations
CREATE TABLE public.translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  namespace text NOT NULL,
  key text NOT NULL,
  lang text NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(namespace, key, lang)
);
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read translations" ON public.translations FOR SELECT USING (true);
CREATE INDEX idx_translations_lookup ON public.translations(namespace, key, lang);
CREATE TRIGGER trg_translations_touch BEFORE UPDATE ON public.translations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- analytics_events
CREATE TABLE public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  path text,
  country text,
  ua text,
  session_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);
-- No SELECT policy: only service role reads aggregates.
CREATE INDEX idx_analytics_created ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_type ON public.analytics_events(event_type, created_at DESC);
CREATE INDEX idx_analytics_session ON public.analytics_events(session_id, created_at DESC);

-- admin_login_attempts
CREATE TABLE public.admin_login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text NOT NULL,
  success boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_login_attempts ENABLE ROW LEVEL SECURITY;
-- No public policies.
CREATE INDEX idx_login_attempts_ip ON public.admin_login_attempts(ip, created_at DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.apk_versions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.translations;

-- Seed default site_settings keys
INSERT INTO public.site_settings(key, value) VALUES
  ('hero', '{"badge":"Free Fire & BGMI ke liye built","headline":"VeloRix","subheadline":"Lag-free, ban-free, pro-level gameplay tools for Indian gamers.","cta":"Download APK"}'::jsonb),
  ('stats', '{"downloads":"1.2M+","users":"450K+","rating":"4.9","uptime":"99.99%"}'::jsonb),
  ('faq', '{"items":[]}'::jsonb),
  ('footer', '{"email":"velorix.official@gmail.com","instagram":"","youtube":"","telegram":"","discord":""}'::jsonb),
  ('announcement', '{"enabled":false,"message":"","link":"","mode":"once_per_session"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
