import nodemailer from "nodemailer";

const sendOtpMail = async (toEmail, otp) => {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Your OTP code is: <b>${otp}</b></p>
      <p>This OTP is valid for 3 minutes.</p>
    </div>
  `;

  // 1. Agar RESEND_API_KEY hai toh Resend se bhejo (Render cloud ke liye best)
  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nestro <onboarding@resend.dev>",
        to: [toEmail],
        subject: "Verify Your Email - OTP",
        html: emailHtml,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to send email via Resend");
    }
    console.log("OTP sent via Resend");
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

  console.log("OTP sent via Gmail");
};

export default sendOtpMail;
