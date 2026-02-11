import { supabase } from "@/integrations/supabase/client";

export const trackEvent = async (
  eventType: string,
  eventName: string,
  pagePath?: string,
  metadata?: Record<string, unknown>
) => {
  try {
    await supabase.from("analytics_events").insert([{
      event_type: eventType,
      event_name: eventName,
      page_path: pagePath ?? window.location.pathname,
      metadata: (metadata ?? {}) as Record<string, string>,
    }]);
  } catch (e) {
    // Silent fail — analytics should never break the app
    console.warn("Analytics tracking failed:", e);
  }
};

export const trackPageView = (pagePath?: string) =>
  trackEvent("page_view", "page_view", pagePath);

export const trackClick = (buttonName: string, pagePath?: string) =>
  trackEvent("click", buttonName, pagePath);
