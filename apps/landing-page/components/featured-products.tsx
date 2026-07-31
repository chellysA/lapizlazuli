"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { getProductBadge, getProductSize } from "@/lib/product-attributes";

const FeaturedProducts = () => {
  const router = useRouter();
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const { addItem } = useCart();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl py-8">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="ml-2 md:ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result !== null &&
            result.length > 0 &&
            result.map((product: ProductType) => {
              const { images, id, slug, productName } = product;
              const badge = getProductBadge(product);
              const size = getProductSize(product);
              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <Link href={`/product/${slug}`} className="block h-full p-1">
                    <Card className="flex flex-col h-full py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2 h-80 shrink-0 overflow-hidden">
                        <img
                          src={`${images[0].url}`}
                          alt="Image featured"
                          className="object-cover w-full h-full rounded-md"
                        />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`/product/${slug}`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addItem(product);
                              }}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{productName}</h3>
                        <div className="flex items-center justify-between gap-3"></div>
                        {badge && (
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                            {badge}
                          </p>
                        )}
                        {size && (
                          <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                            {size}
                          </p>
                        )}
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
