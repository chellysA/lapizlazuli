"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import InstagramIcon from "../icons/instagram-icon";
import { useGetCategories } from "@/api/useGetProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import { INSTAGRAM_URL } from "@/lib/social";

const ItemsMenuMobile = () => {
  const { result, loading }: ResponseType = useGetCategories();
  const categories: CategoryType[] = !loading && result ? result : [];

  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <Link href="/" className="block py-2 font-medium">
          Inicio
        </Link>
        {categories.length > 0 && (
          <>
            <p className="pt-2 text-xs text-muted-foreground">Categorías</p>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="block py-2 pl-2"
              >
                {category.name}
              </Link>
            ))}
          </>
        )}
        <Link href="/about" className="block py-2 font-medium">
          Nuestra Causa
        </Link>
        <Link href="/faq" className="block py-2 font-medium">
          FAQs
        </Link>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 py-2 font-medium"
        >
          <InstagramIcon size={18} strokeWidth={1.5} />
          Instagram
        </a>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
