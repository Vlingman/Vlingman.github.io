-- Create coaching_applications table
CREATE TABLE public.coaching_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  age INTEGER NOT NULL,
  country_timezone TEXT NOT NULL,
  training_level TEXT NOT NULL,
  is_competitive BOOLEAN NOT NULL,
  training_history TEXT NOT NULL,
  has_worked_with_coach BOOLEAN NOT NULL,
  coach_experience TEXT,
  why_work_with_me TEXT,
  short_term_goals TEXT NOT NULL,
  long_term_goals TEXT NOT NULL,
  motivation TEXT NOT NULL,
  gdpr_consent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.coaching_applications ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form)
CREATE POLICY "Anyone can submit applications"
ON public.coaching_applications
FOR INSERT
WITH CHECK (true);

-- Only allow reading via service role (edge functions)
CREATE POLICY "Service role can read applications"
ON public.coaching_applications
FOR SELECT
USING (false);