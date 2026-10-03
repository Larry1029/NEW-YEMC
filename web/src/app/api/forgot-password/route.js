import sql from "@/app/api/utils/sql";
import { sendEmail } from "@/app/api/utils/send-email";
import crypto from "crypto";
export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }
    const users = await sql`
      SELECT id, email, name FROM auth_users WHERE email = ${email}
    `;
    if (users.length === 0) {
      return Response.json({
        message:
          "If that email is registered, you will receive a reset link shortly",
      });
    }
    const user = users[0];
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); 
    await sql`
      INSERT INTO password_reset_tokens (token, user_id, expires_at)
      VALUES (${token}, ${user.id}, ${expiresAt})
    `;
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password - YEMC",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Reset Your Password</h2>
          <p>Hi${user.name ? ` ${user.name}` : ""},</p>
          <p>You requested to reset your password for your YEMC admin account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(to right, #7c3aed, #3b82f6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Reset Password</a>
          <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #999; font-size: 12px; word-break: break-all;">${resetUrl}</p>
        </div>
      `,
    });
    return Response.json({
      message:
        "If that email is registered, you will receive a reset link shortly",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
