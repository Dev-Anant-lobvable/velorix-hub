UPDATE public.profiles
SET display_name = 'Player'
WHERE display_name ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'display_name', ''), 'Player')
  );
  RETURN NEW;
END;
$$;

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Public can insert analytics" ON public.analytics_events;
REVOKE INSERT ON public.analytics_events FROM anon, authenticated;