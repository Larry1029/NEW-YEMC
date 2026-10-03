import { auth } from "@/auth";
import { sendEmail } from "@/app/api/utils/send-email";
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { to, subject, message, applicantName } = await request.json();
    if (!to || !subject || !message) {
      return Response.json(
        { error: "Missing required fields: to, subject, message" },
        { status: 400 },
      );
    }
    await sendEmail({
      to,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; font-weight: 800; margin-bottom: 8px;">
                  YEMC
                </div>
                <div style="color: #94a3b8; font-size: 14px;">
                  Youth Environmental Movement of Canada
                </div>
              </div>
              <!-- Main Content -->
              <div style="background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
                ${applicantName ? `<div style="color: #e2e8f0; font-size: 16px; margin-bottom: 24px;">Hi ${applicantName},</div>` : ""}
                <div style="color: #cbd5e1; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${message}
                </div>
              </div>
              <!-- Footer -->
              <div style="text-align: center; color: #64748b; font-size: 13px; line-height: 1.6;">
                <p style="margin: 0 0 8px 0;">Best regards,<br><strong style="color: #94a3b8;">Youth Environmental Movement of Canada</strong></p>
                <p style="margin: 16px 0 0 0;">
                  <a href="mailto:info@yemc.ca" style="color: #8b5cf6; text-decoration: none;">info@yemc.ca</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return Response.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email to applicant:", error);
    return Response.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 },
    );
  }
}
