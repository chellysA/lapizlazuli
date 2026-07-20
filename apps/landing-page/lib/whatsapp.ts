const WHATSAPP_PHONE_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}
