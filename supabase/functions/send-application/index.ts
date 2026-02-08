import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ApplicationData {
  fullName: string;
  email: string;
  age: number;
  countryTimezone: string;
  instagram?: string;
  trainingLevel: string;
  isCompetitive: boolean;
  trainingHistory: string;
  hasWorkedWithCoach: boolean;
  coachExperience?: string;
  whyWorkWithMe?: string;
  shortTermGoals: string;
  longTermGoals: string;
  motivation: string;
  gdprConsent: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ApplicationData = await req.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.age || !data.countryTimezone ||
        !data.trainingLevel || data.isCompetitive === undefined ||
        !data.trainingHistory || data.hasWorkedWithCoach === undefined ||
        !data.shortTermGoals || !data.longTermGoals || !data.motivation ||
        !data.gdprConsent) {
      throw new Error("Missing required fields");
    }

    // Store in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("coaching_applications")
      .insert({
        full_name: data.fullName,
        email: data.email,
        age: data.age,
        country_timezone: data.countryTimezone,
        training_level: data.trainingLevel,
        is_competitive: data.isCompetitive,
        training_history: data.trainingHistory,
        has_worked_with_coach: data.hasWorkedWithCoach,
        coach_experience: data.coachExperience || null,
        why_work_with_me: data.whyWorkWithMe || null,
        short_term_goals: data.shortTermGoals,
        long_term_goals: data.longTermGoals,
        motivation: data.motivation,
        gdpr_consent: data.gdprConsent,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save application");
    }

    // Send email notification
    const emailHtml = `
      <h1>New Athlete Application</h1>
      
      <h2>Basic Information</h2>
      <ul>
        <li><strong>Name:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Age:</strong> ${data.age}</li>
        <li><strong>Country / Time Zone:</strong> ${data.countryTimezone}</li>
        ${data.instagram ? `<li><strong>Instagram:</strong> ${data.instagram}</li>` : ""}
      </ul>
      
      <h2>Athletic Background</h2>
      <ul>
        <li><strong>Training Level:</strong> ${data.trainingLevel}</li>
        <li><strong>Currently Competitive:</strong> ${data.isCompetitive ? "Yes" : "No"}</li>
        <li><strong>Training History:</strong><br/>${data.trainingHistory.replace(/\n/g, "<br/>")}</li>
        <li><strong>Worked with Coach Before:</strong> ${data.hasWorkedWithCoach ? "Yes" : "No"}</li>
        ${data.coachExperience ? `<li><strong>Coach Experience:</strong><br/>${data.coachExperience.replace(/\n/g, "<br/>")}</li>` : ""}
      </ul>
      
      <h2>Why They're Here</h2>
      ${data.whyWorkWithMe ? `<p><strong>Why work with you specifically:</strong><br/>${data.whyWorkWithMe.replace(/\n/g, "<br/>")}</p>` : ""}
      <p><strong>Short-term goals (3-6 months):</strong><br/>${data.shortTermGoals.replace(/\n/g, "<br/>")}</p>
      <p><strong>Long-term goals (1+ year):</strong><br/>${data.longTermGoals.replace(/\n/g, "<br/>")}</p>
      <p><strong>Motivation:</strong><br/>${data.motivation.replace(/\n/g, "<br/>")}</p>
      
      <hr/>
      <p><em>GDPR consent given: ${data.gdprConsent ? "Yes" : "No"}</em></p>
      <p><em>Submitted at: ${new Date().toISOString()}</em></p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Viktor Lingman Coaching <onboarding@resend.dev>",
      to: ["vabba.lingman@gmail.com"],
      subject: `New Athlete Application: ${data.fullName}`,
      html: emailHtml,
      reply_to: data.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-application function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
