
-- Drop the view first
DROP VIEW IF EXISTS public.daily_analytics;

-- Create a real table
CREATE TABLE public.daily_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_date date NOT NULL,
  event_type text NOT NULL,
  event_name text NOT NULL,
  page_path text,
  total_count integer NOT NULL DEFAULT 0,
  UNIQUE(event_date, event_type, event_name, page_path)
);

-- Enable RLS
ALTER TABLE public.daily_analytics ENABLE ROW LEVEL SECURITY;

-- Only service role can read
CREATE POLICY "Service role can read daily analytics"
  ON public.daily_analytics FOR SELECT
  USING (false);

-- Populate with existing data
INSERT INTO public.daily_analytics (event_date, event_type, event_name, page_path, total_count)
SELECT
  date(created_at AT TIME ZONE 'UTC'),
  event_type,
  event_name,
  page_path,
  COUNT(*)
FROM public.analytics_events
GROUP BY date(created_at AT TIME ZONE 'UTC'), event_type, event_name, page_path;

-- Create function to update daily_analytics on new events
CREATE OR REPLACE FUNCTION public.update_daily_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.daily_analytics (event_date, event_type, event_name, page_path, total_count)
  VALUES (date(NEW.created_at AT TIME ZONE 'UTC'), NEW.event_type, NEW.event_name, NEW.page_path, 1)
  ON CONFLICT (event_date, event_type, event_name, page_path)
  DO UPDATE SET total_count = daily_analytics.total_count + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on analytics_events insert
CREATE TRIGGER trg_update_daily_analytics
  AFTER INSERT ON public.analytics_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_daily_analytics();
