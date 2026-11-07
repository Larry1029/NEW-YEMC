import { requireAdmin } from "@/app/api/utils/authorization";
import { sendEmail } from "@/app/api/utils/send-email";
import sql from "@/app/api/utils/sql";

const LIVE_LINK =
  "https://web.facebook.com/watch/live/?extid=CL-UNK-UNK-UNK-UNK_GK0T-GK1C&ref=watch_permalink&v=1031824685983358";

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

export async function POST() {
  const { response } = await requireAdmin();
  if (response) return response;

  const registrants = await sql`
    SELECT DISTINCT full_name, email
    FROM applications
    WHERE LOWER(REPLACE(COALESCE(registration_type, ''), '-', '_'))
      IN ('virtual', 'virtual_registration', 'virtualregistration')
      OR LOWER(TRIM(COALESCE(status, '')))
      IN ('virtual', 'virtual registration')
  `;

  let sent = 0;
  const failed = [];

  for (const registrant of registrants) {
    const email = String(registrant.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      failed.push({ email, reason: "Invalid email address" });
      continue;
    }

    try {
      await sendEmail({
        to: email,
        subject: "Watch the YEMC 2026 Conference Live",
        html: `
          <div style="margin:0;background:#f8fafc;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
            <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;">
              <div style="padding:32px;text-align:center;background:#4c1d95;color:#ffffff;">
                <div style="font-size:13px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;color:#ddd6fe;">YEMC 2026</div>
                <h1 style="margin:12px 0 0;font-size:30px;line-height:1.15;">Join the Conference Live</h1>
              </div>
              <div style="padding:32px;line-height:1.7;">
                <p>Hi ${escapeHtml(registrant.full_name || "Virtual Attendee")},</p>
                <p>Thank you for joining us virtually. Watch the YEMC 2026 Conference live using the link below.</p>
                <p style="text-align:center;margin:28px 0;">
                  <a href="${LIVE_LINK}" style="display:inline-block;background:#7c3aed;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 24px;border-radius:999px;">
                    Watch Conference Live
                  </a>
                </p>
                <p style="font-size:14px;color:#475569;word-break:break-all;">
                  Or copy this link:<br>
                  <a href="${LIVE_LINK}" style="color:#6d28d9;">${LIVE_LINK}</a>
                </p>
              </div>
            </div>
          </div>
        `,
        text: `Hi ${registrant.full_name || "Virtual Attendee"},\n\nWatch the YEMC 2026 Conference live here:\n${LIVE_LINK}`,
      });
      sent += 1;
    } catch (error) {
      failed.push({ email, reason: error.message });
    }
  }

  return Response.json({
    success: failed.length === 0,
    sent,
    failed,
    virtualRegistrants: registrants.length,
  }, { status: failed.length === 0 ? 200 : 207 });
}
