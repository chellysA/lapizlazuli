import { Separator } from "@/components/ui/separator";
import JoinMovement from "@/components/join-movement";
import InstagramIcon from "@/components/icons/instagram-icon";
import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/social";

export const metadata = {
  title: "Nuestra Causa | Lapislázuli",
  description:
    "Lapislázuli es una tienda online venezolana que destina el 100% de sus ganancias a la recuperación de las comunidades afectadas por el terremoto en Venezuela.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl px-6 py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Una tienda online con el corazón en Venezuela.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        lapislázuli nació de una profunda inquietud y una pregunta urgente tras
        el terremoto que afectó a nuestro país: &ldquo;¿Cómo ayudo a las
        personas afectadas?&rdquo;. Frente a la adversidad, nuestro corazón no
        podía quedarse de brazos cruzados. Decidimos actuar y crear lapislázuli,
        una tienda online de impacto social directo donde cada producto tiene un
        propósito vital.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Desde el primer día, establecimos un compromiso inquebrantable: el 100%
        de nuestras ganancias se destina íntegramente a donativos y fondos de
        recuperación para las familias damnificadas. Al elegir Lapislázuli, no
        solo adquieres un artículo creado con dedicación; te conviertes en un
        pilar fundamental para quienes hoy necesitan reconstruir sus hogares y
        sus vidas.
      </p>

      <Separator className="my-10 border-gray-200 dark:border-gray-700" />

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Misión</h2>
          <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            Ofrecer productos de calidad a través de nuestra tienda online con
            un propósito humano y urgente: destinar el 100% de nuestras
            ganancias a la asistencia, recuperación y apoyo de las comunidades
            afectadas por el terremoto en Venezuela. Transformamos cada venta en
            ayuda directa y esperanza.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Visión</h2>
          <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            Ser una tienda online de referencia que demuestre que el comercio
            digital puede tener un alma solidaria, consolidándonos como un canal
            transparente, sostenible y efectivo para la reconstrucción social de
            nuestro país.
          </p>
        </div>
      </div>

      <Separator className="my-10 border-gray-200 dark:border-gray-700" />

      <div className="p-6 text-center border rounded-lg border-gray-200 dark:border-gray-700">
        <p className="text-xl font-bold">
          El 100% de las ganancias de cada venta se dona.
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Cada compra que hace s se convierte en ayuda directa para Venezuela.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 mt-5 font-medium text-white bg-black rounded-full dark:bg-white dark:text-black"
        >
          Ver productos
        </Link>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-4 text-sm font-medium hover:underline"
        >
          <InstagramIcon size={18} strokeWidth={1.5} />
          Síguenos en Instagram
        </a>
      </div>

      <div className="-mx-6 sm:-mx-24">
        <JoinMovement />
      </div>
    </div>
  );
}
