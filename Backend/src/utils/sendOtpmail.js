import nodemailer from "nodemailer";

const sendOtpMail = async (toEmail, otp) => {
  try {
    const emailUser = process.env.EMAIL_USER?.replace(/^["']|["']$/g, "").trim();
    const emailPass = process.env.EMAIL_PASS?.replace(/^["']|["']$/g, "").trim();

    if (!emailUser || !emailPass) {
      throw new Error("EMAIL_USER or EMAIL_PASS environment variable is missing on server");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 15000,
    });

    const mailOptions = {
      from: `"Nestro Website" <${emailUser}>`,
      to: toEmail,
      subject: "Verify Your Email - OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px">
          <h2>Email Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="letter-spacing:4px">${otp}</h1>
          <p>This OTP is valid for <b>3 minutes</b>.</p>
          <p>If you didn't request this, ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP email sent successfully to", toEmail);
  } catch (error) {
    console.error("OTP email sending error:", error);
    throw error;
  }
};

export default sendOtpMail;
