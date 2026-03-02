
CREATE OR REPLACE FUNCTION public.update_daily_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.daily_analytics (event_date, event_type, event_name, page_path, total_count)
  VALUES (date(NEW.created_at AT TIME ZONE 'UTC'), NEW.event_type, NEW.event_name, NEW.page_path, 1)
  ON CONFLICT (event_date, event_type, event_name, page_path)
  DO UPDATE SET total_count = public.daily_analytics.total_count + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;
