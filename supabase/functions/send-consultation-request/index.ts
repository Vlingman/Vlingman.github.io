import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY secret");
    return json({ error: "Email service is not configured" }, 500);
  }

  const resend = new Resend(resendApiKey);

  try {
    const payload = (await req.json().catch(() => null)) as ConsultationRequest | null;

    if (!payload) {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const { name, email, preferredDate, preferredTime, message } = payload;

    if (!name || !email || !preferredDate || !preferredTime) {
      return json(
        {
          error:
            "Missing required fields: name, email, preferredDate, preferredTime",
        },
        400,
      );
    }

    const notifyEmail = (Deno.env.get("CONSULTATION_NOTIFY_TO") || "").trim();
    if (!notifyEmail) {
      console.error("Missing CONSULTATION_NOTIFY_TO secret");
      return json(
        { error: "Notification email is not configured" },
        500,
      );
    }

    console.log("Received consultation request:", {
      name,
      email,
      preferredDate,
      preferredTime,
    });

    // Send notification email to the coach
    const notificationResponse = await resend.emails.send({
      from: "Consultation Requests <onboarding@resend.dev>",
      to: [notifyEmail],
      subject: `New Consultation Request from ${name}`,
      html: `
        <h1>New Consultation Request</h1>
        <p>You have received a new consultation request with the following details:</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Preferred Date</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${preferredDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Preferred Time</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${preferredTime}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
          </tr>
          ` : ""}
        </table>
        <p style="margin-top: 20px;">Please respond to confirm the consultation time.</p>
      `,
    });

    if (notificationResponse?.error) {
      console.error("Notification email failed:", notificationResponse);
      throw new Error(notificationResponse.error.message);
    }

    console.log("Notification email sent:", notificationResponse);

    // Send confirmation email to the requester
    const confirmationResponse = await resend.emails.send({
      from: "Consultation <onboarding@resend.dev>",
      to: [email],
      subject: "Your Consultation Request Received!",
      html: `
        <h1>Thank you for your consultation request, ${name}!</h1>
        <p>I have received your request for a free 30-minute consultation.</p>
        <p><strong>Requested Date:</strong> ${preferredDate}</p>
        <p><strong>Requested Time:</strong> ${preferredTime}</p>
        ${message ? `<p><strong>Your Message:</strong> ${message}</p>` : ""}
        <p>I will get back to you within 24 hours to confirm your consultation time.</p>
        <p>Best regards,<br>Your Strongman Coach</p>
      `,
    });

    if (confirmationResponse?.error) {
      console.error("Confirmation email failed:", confirmationResponse);
      throw new Error(confirmationResponse.error.message);
    }

    console.log("Confirmation email sent:", confirmationResponse);

    return json({ success: true, message: "Consultation request sent" }, 200);
  } catch (error: any) {
    console.error("Error in send-consultation-request:", error);
    return json(
      {
        success: false,
        error: error?.message ?? "Unknown error",
      },
      500,
    );
  }
};

serve(handler);
