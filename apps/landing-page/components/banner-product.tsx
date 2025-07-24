import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <p>Prendas unicas y a tu medida</p>
        <h4 className="mt-2 text-5xl font-extrabold uppercase">
          <span className="text-primary">Lapislazuli</span>
        </h4>
        <p className="mb-4">Moda modesta y con estilo</p>
        <Link href="#" className={buttonVariants()}>
          Comprar
        </Link>
      </div>
      <div className="h-[350px] bg-cover lg:h-[900px] bg-[url('/banner.jpg')] bg-center mt-5" />
    </>
  );
};

export default BannerProduct;
