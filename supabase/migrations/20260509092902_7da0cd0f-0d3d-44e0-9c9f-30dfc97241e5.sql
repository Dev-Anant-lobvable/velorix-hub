CREATE TABLE IF NOT EXISTS public.site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.custom_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT custom_pages_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read site config" ON public.site_config;
CREATE POLICY "Public can read site config"
ON public.site_config
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public can read published custom pages" ON public.custom_pages;
CREATE POLICY "Public can read published custom pages"
ON public.custom_pages
FOR SELECT
USING (published = true);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS touch_site_config_updated_at ON public.site_config;
CREATE TRIGGER touch_site_config_updated_at
BEFORE UPDATE ON public.site_config
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_custom_pages_updated_at ON public.custom_pages;
CREATE TRIGGER touch_custom_pages_updated_at
BEFORE UPDATE ON public.custom_pages
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.site_config (key, value)
VALUES ('maintenance', '{"enabled": false, "message": "Arena upgrade chal raha hai. Thoda ruk jao, squad soon back hogi."}'::jsonb)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.site_config REPLICA IDENTITY FULL;
ALTER TABLE public.custom_pages REPLICA IDENTITY FULL;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.site_config;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.custom_pages;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;