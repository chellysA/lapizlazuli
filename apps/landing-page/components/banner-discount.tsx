import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
  return (
    <div className="p-5 sm:p-20 text-center">
      <h2 className="uppercase font-black text-2xl text-primary">
        Compra lo que necesitas y ayuda a los que más lo necesitan.
      </h2>
      <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
        <Link href="/cart" className={buttonVariants()}>
          Comprar
        </Link>
        <Link href="/about" className={buttonVariants({ variant: "outline" })}>
          Mas informacion
        </Link>
      </div>
    </div>
  );
};

export default BannerDiscount;
