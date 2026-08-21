interface BookingDetails {
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
}

const HOTEL_WHATSAPP_NUMBER = "2349139135500"; // replace with the real number, format: 234XXXXXXXXXX

export function buildWhatsAppLink({
  roomName,
  checkIn,
  checkOut,
  guests,
  name,
}: BookingDetails): string {
  const message = `Hello Exclusive Holiday & Suites, I'd like to book a room.

Room: ${roomName}
Check-in: ${checkIn || "Not specified"}
Check-out: ${checkOut || "Not specified"}
Guests: ${guests}
Name: ${name}

Please confirm availability and next steps.`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${encoded}`;
}
