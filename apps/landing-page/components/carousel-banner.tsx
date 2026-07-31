"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useGetCategories } from "@/api/useGetProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";

// Keeps the original 1600px rotator geometry (transform-origin, bottom offset)
// proportional at every viewport width.
const CAROUSEL_SIZE = "[--carousel-size:clamp(880px,100vw,1800px)]";
const TRANSITION = "[transition:0.5s_cubic-bezier(0.645,0.045,0.355,1)]";

const CarouselBanner = () => {
  const { result, loading }: ResponseType = useGetCategories();
  const categories: CategoryType[] = !loading && result ? result : [];
  const total = categories.length;
  const showArrows = total > 1;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [total]);

  const onPrevBtn = () => {
    const imgSlider = document.querySelector<HTMLElement>("#imgSlider");
    const newIndex = (index - 1 + total) % total;
    setIndex(newIndex);

    if (imgSlider) {
      imgSlider.style.transform = `rotate(${newIndex * (-360 / total)}deg)`;
    }
  };

  const onNextBtn = () => {
    const imgSlider = document.querySelector<HTMLElement>("#imgSlider");
    const newIndex = (index + 1) % total;
    setIndex(newIndex);

    if (imgSlider) {
      imgSlider.style.transform = `rotate(${newIndex * (-360 / total)}deg)`;
    }
  };

  const currentCategory = categories[index];

  if (loading || total === 0) {
    return (
      <div
        className={`relative overflow-hidden h-[50vh] sm:h-[90vh] dark:bg-[#B39EB5] bg-[#eeebc7] ${CAROUSEL_SIZE}`}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden h-[50vh] sm:h-[90vh] dark:bg-[#B39EB5] bg-[#eeebc7] ${CAROUSEL_SIZE}`}
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[var(--carousel-size)] h-[var(--carousel-size)] bottom-[calc(var(--carousel-size)*-0.68125)]`}
      >
        <div className="h-full rotate-90">
          <div
            id="imgSlider"
            className={`h-full flex items-center justify-center ${TRANSITION}`}
          >
            {/* Bg */}
            {categories.map((category, i) => (
              <div
                key={`bg-${category.id}`}
                className="absolute left-0 origin-[calc(var(--carousel-size)/2)]"
                style={{ transform: `rotate(${(360 / total) * i}deg)` }}
              >
                <img
                  className={`w-[calc(var(--carousel-size)*0.380)] sm:w-[calc(var(--carousel-size)*0.3125)] max-w-none h-auto [transform:rotate(-90deg)_translateY(-30%)] animate-carousel-bounce ${TRANSITION}`}
                  src="/banner-bg-1.png"
                  alt=""
                />
              </div>
            ))}
            {/* images */}
            {categories.map((category, i) => (
              <div
                key={`item-${category.id}`}
                className="absolute left-0 md:left-[-50px] origin-[calc(var(--carousel-size)/2)]"
                style={{ transform: `rotate(${(360 / total) * i}deg)` }}
              >
                <img
                  className="w-[calc(var(--carousel-size)*0.350)] sm:w-[calc(var(--carousel-size)*0.400)] max-w-none h-auto object-cover -rotate-90"
                  src={category.images?.[0]?.url}
                  alt={category.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Info box */}
      <div className="flex flex-col absolute right-4 bottom-4 w-auto sm:w-1/3">
        <div className="flex flex-col justify-center text-right md:text-left text-black dark:text-white">
          <div className="info-item">
            {/* Contenedor principal: en móvil (por defecto) es fila (flex-row), en pantallas sm y superiores vuelve a columna */}
            <div className="flex flex-row sm:flex-col items-center sm:items-start sm:justify-start gap-4">
              {/* Título */}
              <h2 className="text-lg sm:text-xl font-bold m-0">
                {currentCategory?.name}
              </h2>
              {/* Descripción (se mantiene oculta en móviles como tenías originalmente) */}
              <p className="hidden sm:block">{currentCategory?.description}</p>{" "}
              {/* Botón */}
              <Button className="cursor-pointer">
                <Link
                  href={`/category/${currentCategory?.slug}`}
                  className="block"
                >
                  Go now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      {showArrows && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] flex justify-between z-[100]">
          <span
            className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-black/20 rounded-full cursor-pointer"
            onClick={() => onPrevBtn()}
          >
            <ArrowLeft className="w-[18px] h-[18px] sm:w-6 sm:h-6" />
          </span>
          <span
            className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-black/20 rounded-full cursor-pointer"
            onClick={() => onNextBtn()}
          >
            <ArrowRight className="w-[18px] h-[18px] sm:w-6 sm:h-6" />
          </span>
        </div>
      )}
    </div>
  );
};

export default CarouselBanner;
