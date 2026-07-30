import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
  return (
    <div className="p-5 sm:p-20 text-center">
      <div className="mt-4 text-center">
        <p>Prendas unicas y a tu medida</p>
        <h4 className="mt-2 text-5xl font-extrabold uppercase">
          <span className="text-primary">lapislázuli</span>
        </h4>
        <p className="mb-4">Moda modesta y con estilo</p>
        <Link href="/cart" className={buttonVariants()}>
          Comprar
        </Link>
      </div>
    </div>
  );
};

export default BannerDiscount;
