
-- 1. Lock down SECURITY DEFINER trigger functions so they can't be called via the API
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 2. Remove anon/authenticated visibility of admin-only tables (kept service_role for edge functions)
REVOKE ALL ON public.admin_audit_log FROM anon, authenticated;
REVOKE ALL ON public.admin_login_attempts FROM anon, authenticated;
GRANT ALL ON public.admin_audit_log TO service_role;
GRANT ALL ON public.admin_login_attempts TO service_role;

-- Explicit deny SELECT policies so RLS-enabled-with-no-policy lint is satisfied
CREATE POLICY "No client read of admin audit log"
  ON public.admin_audit_log FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "No client write of admin audit log"
  ON public.admin_audit_log FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "No client read of admin login attempts"
  ON public.admin_login_attempts FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "No client write of admin login attempts"
  ON public.admin_login_attempts FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- 3. Restrict apk-files bucket listing: keep file reads public, but disallow listing/enumeration
DROP POLICY IF EXISTS "Public can list apk files" ON storage.objects;
DROP POLICY IF EXISTS "Public read apk files" ON storage.objects;

CREATE POLICY "Public can read apk file objects"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'apk-files' AND name LIKE 'releases/%');
