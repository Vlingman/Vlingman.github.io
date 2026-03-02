
CREATE OR REPLACE VIEW public.daily_analytics AS
SELECT
  date(created_at AT TIME ZONE 'UTC') AS event_date,
  event_type,
  event_name,
  page_path,
  COUNT(*) AS total_count
FROM public.analytics_events
GROUP BY event_date, event_type, event_name, page_path
ORDER BY event_date DESC, total_count DESC;
