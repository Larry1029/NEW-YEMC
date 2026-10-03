import { sendEmail } from "@/app/api/utils/send-email";
import sql from "@/app/api/utils/sql";
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
      !fullName ||
      !email ||
      !phoneNumber ||
      !status ||
      (status === "Other" && !customStatus) ||
      (!institution && status !== "Other" && status !== "Unemployed") ||
      !message
    ) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
        VALUES (${fullName}, ${email}, ${cleanPhone}, ${recordedStatus}, ${institution}, ${message})
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
        from: "onboarding@resend.dev",
        subject: "New YEMC Application",
        html: `
          <h2>New Application Received</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${cleanPhone}</p>
          <p><strong>Status:</strong> ${recordedStatus}</p>
          <p><strong>Institution:</strong> ${institution}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        text: `
          New Application Received
          Name: ${fullName}
          Email: ${email}
          Phone: ${cleanPhone}
          Status: ${recordedStatus}
          Institution: ${institution}
          Message: ${message}
        `,
      });
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError);
    }
    try {
      await sendEmail({
        to: email,
        from: "onboarding@resend.dev",
        subject: "Welcome to YEMC!",
        html: `
          <h2>Welcome to the Young Executive Master Class!</h2>
          <p>Dear ${fullName},</p>
          <p>Thank you for your interest in joining YEMC. We've received your application and are excited to have you on board!</p>
          <p>Our team will review your application and get in touch with you soon.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>The YEMC Team</strong></p>
        `,
        text: `
          Welcome to the Young Executive Master Class!
          Dear ${fullName},
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
