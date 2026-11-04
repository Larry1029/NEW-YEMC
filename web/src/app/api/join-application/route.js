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

const getVirtualRegistrationConfirmationHtml = ({ fullName }) => `
  <div style="margin:0;padding:32px 16px;background:#080808;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;">
      <tr>
        <td style="text-align:center;padding:0 0 18px;">
          <div style="width:50px;height:50px;margin:0 auto 12px;border-radius:50%;background:#1a2c3a;color:#4da3ff;font-size:30px;font-weight:bold;line-height:50px;">&#9654;</div>
          <div style="font-size:20px;font-weight:bold;text-transform:uppercase;">YEMC 2026 Virtual Access</div>
          <div style="margin-top:8px;font-size:15px;color:#aeb8c5;">Your registration has been confirmed.</div>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 12px;border-top:1px solid #343434;border-bottom:1px solid #343434;">
          <div style="font-size:12px;color:#6d9cff;text-transform:uppercase;letter-spacing:.08em;">Attendee</div>
          <div style="margin-top:6px;font-size:22px;font-weight:bold;">${escapeHtml(fullName)}</div>
          <div style="margin-top:14px;font-size:12px;color:#6d9cff;text-transform:uppercase;letter-spacing:.08em;">Registration Type</div>
          <div style="margin-top:5px;font-size:20px;font-weight:bold;">Virtual Attendee</div>
        </td>
      </tr>
      <tr>
        <td style="padding-top:18px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #353535;border-radius:18px;background:#171717;">
            <tr>
              <td style="text-align:center;padding:18px 20px;">
                <div style="font-size:15px;font-weight:bold;color:#00d878;">Registration confirmed</div>
                <div style="margin-top:34px;font-size:22px;font-weight:bold;">Access the Conference</div>
                <div style="margin-top:8px;font-size:14px;color:#b7bec8;line-height:1.5;">Your secure access will become available on event day.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

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
      country,
      otherDetails,
      registrationType,
    } = body;
    const isVirtualRegistration = registrationType === "virtual";
    const nowInGhana = new Date();
    const registrationDeadline = Date.UTC(
      nowInGhana.getUTCFullYear(),
      nowInGhana.getUTCMonth(),
      nowInGhana.getUTCDate(),
      12,
      0,
      0,
    );
    if (!isVirtualRegistration && Date.now() >= registrationDeadline) {
      return Response.json(
        { error: "In-person registration closed. Please register for the virtual experience." },
        { status: 410 },
      );
    }
    const customStatus = typeof otherStatus === "string" ? otherStatus.trim() : "";
    const recordedStatus = status === "Other" ? `Other: ${customStatus}` : status;
    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof phoneNumber !== "string" ||
      !phoneNumber.trim() ||
      (isVirtualRegistration && (typeof country !== "string" || !country.trim() || typeof otherDetails !== "string" || !otherDetails.trim())) ||
      (!isVirtualRegistration && (typeof status !== "string" ||
      !status.trim() ||
      typeof message !== "string" ||
      !message.trim() ||
      (status === "Other" && !customStatus) ||
      (!institution && status !== "Other" && status !== "Unemployed")))
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
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    const validPhone = isVirtualRegistration
      ? /^\d{7,15}$/.test(cleanPhone)
      : /^\d{10}$/.test(cleanPhone);
    if (!validPhone) {
      return Response.json(
        {
          error: isVirtualRegistration
            ? "Phone number must contain 7 to 15 digits"
            : "Phone number must be exactly 10 digits",
        },
        { status: 400 },
      );
    }
    try {
      await sql`
        INSERT INTO applications (full_name, email, phone, status, institution, message, registration_type)
        VALUES (
          ${fullName.trim()},
          ${cleanEmail},
          ${cleanPhone},
          ${isVirtualRegistration ? "Virtual Registration" : recordedStatus},
          ${isVirtualRegistration ? (country || null) : (institution || null)},
          ${isVirtualRegistration ? otherDetails.trim() : message.trim()},
          ${isVirtualRegistration ? "virtual" : "in_person"}
        )
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
        subject: isVirtualRegistration ? "New YEMC Virtual Registration" : "New YEMC Application",
        html: `
          <h2>${isVirtualRegistration ? "New Virtual Registration Received" : "New Application Received"}</h2>
          <p><strong>Registration type:</strong> ${isVirtualRegistration ? "Virtual" : "In-person"}</p>
          <p><strong>Name:</strong> ${escapeHtml(fullName.trim())}</p>
          <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p><strong>Phone:</strong> ${cleanPhone}</p>
          <p><strong>Status:</strong> ${escapeHtml(recordedStatus)}</p>
          ${isVirtualRegistration ? `<p><strong>Country:</strong> ${escapeHtml(country || "")}</p>` : ""}
          <p><strong>Institution:</strong> ${escapeHtml(institution || "")}</p>
          <p><strong>${isVirtualRegistration ? "Other Essential Details" : "Message"}:</strong></p>
          <p>${escapeHtml(isVirtualRegistration ? otherDetails.trim() : message.trim()).replace(/\r?\n/g, "<br>")}</p>
        `,
        text: `
          ${isVirtualRegistration ? "New Virtual Registration Received" : "New Application Received"}
          Registration type: ${isVirtualRegistration ? "Virtual" : "In-person"}
          Name: ${fullName.trim()}
          Email: ${cleanEmail}
          Phone: ${cleanPhone}
          Status: ${recordedStatus}
          Institution: ${institution}
          ${isVirtualRegistration ? `Country: ${country}` : ""}
          ${isVirtualRegistration ? "Other Essential Details" : "Message"}: ${isVirtualRegistration ? otherDetails.trim() : message.trim()}
        `,
      });
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError);
    }
    try {
      await sendEmail({
        to: cleanEmail,
        subject: isVirtualRegistration
          ? "YEMC 2026 Virtual Access Confirmed"
          : "Welcome to YEMC!",
        html: isVirtualRegistration
          ? getVirtualRegistrationConfirmationHtml({ fullName: fullName.trim() })
          : `
            <h2>Welcome to the Young Executive Master Class!</h2>
            <p>Dear ${escapeHtml(fullName.trim())},</p>
            <p>Thank you for your interest in joining YEMC. We've received your application and are excited to have you on board!</p>
            <p>Our team will review your application and get in touch with you soon.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>The YEMC Team</strong></p>
          `,
        text: isVirtualRegistration
          ? `
            YEMC 2026 VIRTUAL ACCESS
            Your registration has been confirmed.

            Attendee: ${fullName.trim()}
            Registration type: Virtual Attendee
            Registration confirmed

            Access the Conference
            Your secure access will become available on event day.
          `
          : `
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
