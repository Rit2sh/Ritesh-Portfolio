import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side validation
    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed on submitted fields.",
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    // Check if an external email delivery webhook/token is configured (e.g. Resend, Sendgrid, Discord webhook)
    const emailWebhook = process.env.CONTACT_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (emailWebhook) {
      const forwardRes = await fetch(emailWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `New Portfolio Inquiry from **${body.name}** (${body.email})\n**Company:** ${body.company || "N/A"}\n**Topic:** ${body.opportunityType}\n**Message:**\n${body.message}`
        })
      });

      if (!forwardRes.ok) {
        return NextResponse.json(
          {
            success: false,
            error: "Notification service temporarily unavailable. Please reach out via direct email."
          },
          { status: 502 }
        );
      }
    } else if (resendApiKey) {
      // If Resend API key is present
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["riteshchauhan.work@gmail.com"],
          subject: `Portfolio Inquiry: ${body.opportunityType} from ${body.name}`,
          text: `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company || "N/A"}\nOpportunity: ${body.opportunityType}\n\nMessage:\n${body.message}`
        })
      });

      if (!resendRes.ok) {
        return NextResponse.json(
          {
            success: false,
            error: "Delivery service reported an issue. Please email riteshchauhan.work@gmail.com directly."
          },
          { status: 502 }
        );
      }
    }

    // In local development or when webhook is not yet injected, accept valid form data and acknowledge receipt
    return NextResponse.json({
      success: true,
      message: "Message received and validated successfully."
    });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred while processing contact form."
      },
      { status: 500 }
    );
  }
}
