import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { INSTAGRAM_URL } from "@/lib/social";

const BRAND_JOIN_MESSAGE =
  "Hola, quiero sumar mi marca a Lapislázuli y ser parte del movimiento.";

export const metadata = {
  title: "Preguntas Frecuentes | Lapislázuli",
  description:
    "Resuelve tus dudas sobre Lapislázuli: cómo se donan las ganancias, métodos de pago y envíos a nivel nacional.",
};

const faqs = [
  {
    question: "¿Qué es Lapislázuli?",
    answer:
      "Lapislázuli es una tienda online venezolana creada con un compromiso social absoluto. Surgimos como respuesta a la emergencia causada por el terremoto, con el objetivo de convertir el comercio electrónico en una herramienta de ayuda humanitaria directa y real.",
  },
  {
    question: "¿Es cierto que Lapislázuli dona sus ganancias?",
    answer:
      "Sí, donamos para la adquisición de insumos y asistencia básica a las personas que más lo necesitan.",
  },
  {
    question: "¿Cómo puedo estar seguro de a dónde van los fondos y donativos?",
    answer:
      "La transparencia es nuestro valor principal. Documentamos y compartimos periódicamente, a través de nuestras redes sociales y canales oficiales, las entregas de donativos y el impacto real que logramos juntos gracias a tu compra.",
    cta: {
      label: "Síguenos en Instagram",
      href: INSTAGRAM_URL,
    },
  },
  {
    question: "¿Cuáles son los métodos de pago disponibles?",
    answer:
      "Contamos con opciones de pago adaptadas, incluyendo pago móvil, transferencias bancarias nacionales y Zelle.",
  },
  {
    question: "¿Realizan envíos a nivel nacional?",
    answer:
      "Sí, gestionamos envíos a toda Venezuela a través de empresas de encomiendas de confianza para que tu pedido llegue seguro a tus manos.",
  },
  {
    question: "¿De qué otra forma puedo ayudar a la causa?",
    answer:
      "Si no puedes realizar una compra en este momento, nos ayudas enormemente compartiendo nuestra tienda online y nuestro propósito en tus redes sociales.",
  },
  {
    question: "Tengo una tienda o marca, ¿también puedo ser parte?",
    answer:
      "¡Sí! Si tienes una tienda o marca, también puedes ser parte del movimiento: mostramos tus productos en Lapislázuli y sumamos fuerzas para seguir destinando el porcentaje de ganancias que desees a la recuperación de Venezuela.",
    cta: {
      label: "Sumar mi marca",
      href: getWhatsAppUrl(BRAND_JOIN_MESSAGE),
    },
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-4xl px-6 py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-bold sm:text-4xl">Preguntas Frecuentes</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Todo lo que necesitas saber sobre Lapislázuli y nuestra causa.
      </p>

      <Separator className="my-8 border-gray-200 dark:border-gray-700" />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {faqs.map((faq) => (
          <details key={faq.question} className="py-5 group">
            <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
              {faq.question}
              <ChevronDown
                size={20}
                className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
              {faq.answer}
            </p>
            {faq.cta && (
              <a
                href={faq.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 mt-3 text-sm font-medium text-white bg-black rounded-full dark:bg-white dark:text-black"
              >
                {faq.cta.label}
              </a>
            )}
          </details>
        ))}
      </div>
    </div>
  );
}
