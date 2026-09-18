import nodemailer from "nodemailer";

const sendOtpMail = async (toEmail, otp) => {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Your OTP code is: <b>${otp}</b></p>
      <p>This OTP is valid for 3 minutes.</p>
      <p>If you didn't request this, ignore this email.</p>
    </div>
  `;

  // 1. Brevo API (Cloud & Render ke liye - kisi bhi email par turant bhejta hai)
  if (process.env.BREVO_API_KEY) {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY.trim(),
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Nestro Website", email: process.env.EMAIL_USER || "amitsutharweb64@gmail.com" },
        to: [{ email: toEmail }],
        subject: "Verify Your Email - OTP",
        htmlContent: emailHtml,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Brevo email sending failed");
    }

    console.log("OTP sent via Brevo to", toEmail);
    return;
  }

  // 2. Localhost ke liye Gmail / Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Nestro Website" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify Your Email - OTP",
    html: emailHtml,
  });

  console.log("OTP sent via Gmail to", toEmail);
};

export default sendOtpMail;
