import QRCode from "qrcode";

// ==========================================
// GENERATE QR CODE
// ==========================================
const generateQRCode = async (ticketData) => {
  try {
    const qrData = JSON.stringify({
      ticket_id: ticketData.ticket_id,
      user_id: ticketData.user_id,
      event_id: ticketData.event_id,
      seat_number: ticketData.seat_number,
      event_title: ticketData.event_title,
      event_date: ticketData.event_date,
      booking_time: new Date(),
    });

    // Generating Base64 QR Code
    const qrCodeImage = await QRCode.toDataURL(qrData);
    return qrCodeImage;
  } catch (error) {
    console.error("QR Generation Error:", error.message);
    throw new Error("Failed to generate QR code");
  }
};

export default generateQRCode;
