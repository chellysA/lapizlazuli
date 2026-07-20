"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useGetCategories } from "@/api/useGetProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";

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
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
