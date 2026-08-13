"use client";
import { BaggageClaim, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import InstagramIcon from "../icons/instagram-icon";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { INSTAGRAM_URL } from "@/lib/social";

const Navbar = () => {
  const router = useRouter();
  const cart = useCart();
  const { lovedItems } = useLovedProducts();
  const cartQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer">
      <h1 className="text-3xl font-bold" onClick={() => router.push("/")}>
        lapislázuli
      </h1>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {cart.items.length === 0 ? (
          <ShoppingCart
            strokeWidth={1}
            className="cursor-pointer"
            onClick={() => router.push("/cart")}
          />
        ) : (
          <div className="flex gap-1" onClick={() => router.push("/cart")}>
            <BaggageClaim strokeWidth={1} className="cursor-pointer" />
            <span>{cartQuantity}</span>
          </div>
        )}
        <Heart
          strokeWidth={1}
          className={`cursor-pointer ${
            lovedItems.length > 0 && "fill-black dark:fill-white"
          }`}
          onClick={() => router.push("/loved-products")}
        />
        {/* <User strokeWidth={1} className="cursor-pointer" /> */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Síguenos en Instagram"
        >
          <InstagramIcon strokeWidth={1} className="cursor-pointer" />
        </a>
        {/* <ToggleTheme /> */}
      </div>
    </div>
  );
};

export default Navbar;
