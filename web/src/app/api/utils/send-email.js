export async function sendEmail({ to, subject, html, text, attachments = [] }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is not configured");
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      ...(attachments.length > 0
        ? {
            attachments: attachments.map(({ contentId, ...attachment }) => ({
              ...attachment,
              ...(contentId ? { content_id: contentId } : {}),
            })),
          }
        : {}),
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send email");
  }
  return { id: data.id };
}