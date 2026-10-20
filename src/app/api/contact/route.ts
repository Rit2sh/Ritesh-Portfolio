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
      const sendViaResend = async (targetEmail: string) => {
        return fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [targetEmail],
            reply_to: body.email,
            subject: `Portfolio Inquiry: ${body.opportunityType} from ${body.name}`,
            text: `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company || "N/A"}\nOpportunity: ${body.opportunityType}\n\nMessage:\n${body.message}`
          })
        });
      };

      const primaryTarget = process.env.CONTACT_RECEIVER_EMAIL || "chauhan.ritesh.work@gmail.com";
      let resendRes = await sendViaResend(primaryTarget);

      if (!resendRes.ok) {
        const errDetail = await resendRes.text().catch(() => "");
        console.error("Resend API delivery error on primary recipient:", errDetail);

        // Resend sandbox testing mode returns:
        // "You can only send testing emails to your own email address (xyz@gmail.com)..."
        const allowedEmailMatch = errDetail.match(/\(([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)\)/);
        if (allowedEmailMatch && allowedEmailMatch[1] && allowedEmailMatch[1] !== primaryTarget) {
          console.log(`Resend sandbox restriction detected. Auto-forwarding to verified account email: ${allowedEmailMatch[1]}`);
          resendRes = await sendViaResend(allowedEmailMatch[1]);
        } else if (primaryTarget !== "rajputanaritesh@gmail.com") {
          console.log("Retrying to secondary owner email: rajputanaritesh@gmail.com");
          resendRes = await sendViaResend("rajputanaritesh@gmail.com");
        }

        // If external API still fails, log complete inquiry payload so no inquiry is ever lost
        if (!resendRes.ok) {
          console.error("Inquiry recorded in runtime log due to email delivery provider limitation:", {
            name: body.name,
            email: body.email,
            company: body.company,
            topic: body.opportunityType,
            message: body.message,
            timestamp: new Date().toISOString()
          });

          return NextResponse.json({
            success: true,
            fallbackLogged: true,
            message: "Inquiry received and logged. If urgent, feel free to reach out directly at chauhan.ritesh.work@gmail.com."
          });
        }
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
