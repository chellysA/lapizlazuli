import Link from "next/link";
import { Separator } from "./ui/separator";

const dataFooter = [
  { id: 1, name: "Sobre Nosotros", link: "#" },
  { id: 2, name: "Preguntas Frecuentes", link: "#" },
  { id: 3, name: "Política de Privacidad", link: "#" },
  { id: 4, name: "Términos y Condiciones", link: "#" },
];
const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <p>Lapislazuli</p>
          <ul className="flex flex-wrap items-center my-6 text-sm font-medium text-gray-500  sm:my-0 dark:tet-gray-400">
            {dataFooter.map((item) => (
              <li key={item.id} className="me-4 hover:underline md:me-6">
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6 border-gray-200 dark:border-gray-700 lg:my-8 " />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          &copy; 2025
          <Link href="/"> Lapislazuli </Link>
          Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
