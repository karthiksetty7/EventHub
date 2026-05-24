import nodemailer from "nodemailer";

// ==========================================
// CREATING EMAIL TRANSPORTER
// ==========================================
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // sandbox.smtp.mailtrap.io
  port: process.env.EMAIL_PORT, // 2525
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingConfirmationEmail = async (bookingDetails) => {
  try {
    const {
      userEmail,
      userName,
      eventTitle,
      eventDate,
      eventTime,
      location,
      seatNumber,
      ticketPrice,
      qrCode,
    } = bookingDetails;

    const mailOptions = {
      from: "noreply@eventbooking.com", // This can be anything in Sandbox
      to: userEmail,
      subject: "Your Event Ticket Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Booking Confirmed 🎉</h2>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your ticket for <strong>${eventTitle}</strong> is confirmed.</p>
          <img src="${qrCode}" alt="QR Ticket" width="220" />
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Booking confirmation email sent successfully to:", userEmail);
  } catch (error) {
    console.error("Email Service Error:", error.message);
    throw new Error("Failed to send booking confirmation email");
  }
};
