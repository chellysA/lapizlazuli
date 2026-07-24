import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const BRAND_JOIN_MESSAGE =
  "Hola, quiero sumar mi marca a Lapislázuli y ser parte del movimiento.";

const JoinMovement = () => {
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <div className="p-8 text-center border rounded-lg border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-slate-900">
        <h3 className="text-2xl font-bold sm:text-3xl">
          ¿Tienes una tienda o marca? Sumate al movimiento!
        </h3>
        <p className="max-w-2xl mx-auto mt-4 text-gray-700 dark:text-gray-300">
          Si eres una marca o emprendimiento, también puedes ser parte:
          mostramos tus productos en Lapislázuli y sumamos fuerzas para seguir
          aportando con el porcentaje de ganancias que desees a la recuperación
          de Venezuela.
        </p>
        <a
          href={getWhatsAppUrl(BRAND_JOIN_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="mt-6" size="lg">
            <MessageCircle />
            Sumar mi marca
          </Button>
        </a>
      </div>
    </div>
  );
};

export default JoinMovement;
