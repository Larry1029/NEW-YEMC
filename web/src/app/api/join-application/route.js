import { sendEmail } from "@/app/api/utils/send-email";
import sql from "@/app/api/utils/sql";

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phoneNumber,
      status,
      otherStatus,
      institution,
      message,
    } = body;
    const customStatus = typeof otherStatus === "string" ? otherStatus.trim() : "";
    const recordedStatus = status === "Other" ? `Other: ${customStatus}` : status;
    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof phoneNumber !== "string" ||
      !phoneNumber.trim() ||
      typeof status !== "string" ||
      !status.trim() ||
      typeof message !== "string" ||
      !message.trim() ||
      (status === "Other" && !customStatus) ||
      (!institution && status !== "Other" && status !== "Unemployed")
    ) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim();
    if (!emailRegex.test(cleanEmail)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return Response.json(
        { error: "Phone number must be exactly 10 digits" },
        { status: 400 },
      );
    }
    try {
      await sql`
        INSERT INTO applications (full_name, email, phone, status, institution, message)
        VALUES (${fullName.trim()}, ${cleanEmail}, ${cleanPhone}, ${recordedStatus}, ${institution || null}, ${message.trim()})
      `;
    } catch (dbError) {
      console.error("Failed to save application to database:", dbError);
      return Response.json(
        { error: "Failed to save application. Please try again." },
        { status: 500 },
      );
    }
    try {
      await sendEmail({
        to: "theyoungexecutivemasterclass@gmail.com",
        subject: "New YEMC Application",
        html: `
          <h2>New Application Received</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName.trim())}</p>
          <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p><strong>Phone:</strong> ${cleanPhone}</p>
          <p><strong>Status:</strong> ${escapeHtml(recordedStatus)}</p>
          <p><strong>Institution:</strong> ${escapeHtml(institution || "")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message.trim()).replace(/\r?\n/g, "<br>")}</p>
        `,
        text: `
          New Application Received
          Name: ${fullName.trim()}
          Email: ${cleanEmail}
          Phone: ${cleanPhone}
          Status: ${recordedStatus}
          Institution: ${institution}
          Message: ${message.trim()}
        `,
      });
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError);
    }
    try {
      await sendEmail({
        to: cleanEmail,
        subject: "Welcome to YEMC!",
        html: `
          <h2>Welcome to the Young Executive Master Class!</h2>
          <p>Dear ${escapeHtml(fullName.trim())},</p>
          <p>Thank you for your interest in joining YEMC. We've received your application and are excited to have you on board!</p>
          <p>Our team will review your application and get in touch with you soon.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>The YEMC Team</strong></p>
        `,
        text: `
          Welcome to the Young Executive Master Class!
          Dear ${fullName.trim()},
          Thank you for your interest in joining YEMC. We've received your application and are excited to have you on board!
          Our team will review your application and get in touch with you soon.
          Best regards,
          The YEMC Team
        `,
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing application:", error);
    return Response.json(
      { error: "Failed to process application" },
      { status: 500 },
    );
  }
}
