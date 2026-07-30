"use client";

import Link from "next/link";

import { useGetCategories } from "@/api/useGetProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const MenuList = () => {
  const { result, loading }: ResponseType = useGetCategories();
  const categories: CategoryType[] = !loading && result ? result : [];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-1 p-3">
              {categories.length === 0 && (
                <li className="px-3 py-2 text-sm text-muted-foreground">
                  No hay categorías disponibles.
                </li>
              )}
              {categories.map((category) => (
                <li key={category.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/category/${category.slug}`}
                      className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      {category.name}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">Nuestra Causa</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/faq">FAQs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuList;
