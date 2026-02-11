
CREATE TABLE public.analytics_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  event_name text NOT NULL,
  page_path text,
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Anyone can insert events (anonymous tracking)
CREATE POLICY "Anyone can insert analytics events"
ON public.analytics_events
FOR INSERT
WITH CHECK (true);

-- Only service role can read (via edge function or direct DB access)
CREATE POLICY "Service role can read analytics"
ON public.analytics_events
FOR SELECT
USING (false);

-- Index for querying by event type and date
CREATE INDEX idx_analytics_event_type ON public.analytics_events (event_type, created_at DESC);
CREATE INDEX idx_analytics_event_name ON public.analytics_events (event_name, created_at DESC);
