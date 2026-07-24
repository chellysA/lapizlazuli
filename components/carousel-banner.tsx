"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
export const dataCarouselTop = [
  {
    id: 1,
    title: "Tailoring",
    description: "Description 1",
    link: "/tailoring",
  },
  {
    id: 2,
    title: "Upcycling",
    description: "Description 2",
    link: "/upcycling",
  },
  {
    id: 3,
    title: "Jewerly",
    description: "Description 3",
    link: "/jewerly",
  },
  {
    id: 4,
    title: "Title 4",
    description: "",
    link: "/",
  },
];

// Keeps the original 1600px rotator geometry (transform-origin, bottom offset)
// proportional at every viewport width.
const CAROUSEL_SIZE = "[--carousel-size:clamp(880px,100vw,1600px)]";
const TRANSITION = "[transition:0.5s_cubic-bezier(0.645,0.045,0.355,1)]";

const CarouselBanner = () => {
  const [indexSlider, setIndexSlider] = useState(0);
  const [index, setIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
  }, [index]);

  const onPrevBtn = () => {
    const imgSlider = document.querySelector<HTMLElement>("#imgSlider");
    const imgBg = document.querySelectorAll("#imgBg");

    const newIndex = index - 1 + imgBg.length;
    setIndex(newIndex);
    setIndexSlider((prevIndexSlider) => prevIndexSlider - 1);

    if (imgSlider) {
      imgSlider.style.transform = `rotate(${newIndex * -90}deg)`;
    }

    document.querySelector(".active")?.classList.remove("active");
    imgBg[newIndex].classList.add("active");
  };

  const onNextBtn = () => {
    const imgSlider = document.querySelector<HTMLElement>("#imgSlider");
    const imgBg = document.querySelectorAll("#imgBg");

    // Incrementar el índice
    const newIndex = (index + 1) % imgBg.length;
    setIndex(newIndex);
    setIndexSlider((prevIndexSlider) => prevIndexSlider + 1);

    if (imgSlider) {
      imgSlider.style.transform = `rotate(${(index + 1) * -90}deg)`;
    }

    // Actualizar la clase activa
    document.querySelector(".active")?.classList.remove("active");
    imgBg[newIndex].classList.add("active");
  };

  const currentData = dataCarouselTop[index];
  return (
    <div
      className={`relative overflow-hidden h-[50vh] sm:h-[90vh] dark:bg-black bg-[#eeebc7] ${CAROUSEL_SIZE}`}
    >
      <div id="bgBox">
        <div className={`bg`}></div>
        <div className={`bg`}></div>
        <div className={`bg`}></div>
        <div className={`bg`}></div>
      </div>
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[var(--carousel-size)] h-[var(--carousel-size)] bottom-[calc(var(--carousel-size)*-0.68125)]`}
      >
        <div className="h-full rotate-90">
          <div
            id="imgSlider"
            className={`h-full flex items-center justify-center ${TRANSITION}`}
          >
            {/* Bg */}
            <div
              id="imgBg"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*0)] active`}
            >
              <img
                className={`w-[calc(var(--carousel-size)*0.38)] sm:w-[calc(var(--carousel-size)*0.3125)] max-w-none h-auto [transform:rotate(-90deg)_translateY(-30%)] animate-carousel-bounce ${TRANSITION}`}
                src="/banner-bg-1.png"
              />
            </div>
            <div
              id="imgBg"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*1)]`}
            >
              <img
                className={`w-[calc(var(--carousel-size)*0.38)] sm:w-[calc(var(--carousel-size)*0.3125)] max-w-none h-auto [transform:rotate(-90deg)_translateY(-30%)] animate-carousel-bounce ${TRANSITION}`}
                src="/banner-bg-1.png"
              />
            </div>
            <div
              id="imgBg"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*2)]`}
            >
              <img
                className={`w-[calc(var(--carousel-size)*0.38)] sm:w-[calc(var(--carousel-size)*0.3125)] max-w-none h-auto [transform:rotate(-90deg)_translateY(-30%)] animate-carousel-bounce ${TRANSITION}`}
                src="/banner-bg-1.png"
              />
            </div>
            <div
              id="imgBg"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*3)]`}
            >
              <img
                className={`w-[calc(var(--carousel-size)*0.38)] sm:w-[calc(var(--carousel-size)*0.3125)] max-w-none h-auto [transform:rotate(-90deg)_translateY(-30%)] animate-carousel-bounce ${TRANSITION}`}
                src="/banner-bg-1.png"
              />
            </div>
            {/* images */}
            <div
              id="imgItem"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*0)]`}
            >
              <img
                className="w-[calc(var(--carousel-size)*0.32)] sm:w-[calc(var(--carousel-size)*0.255)] max-w-none h-auto -rotate-90"
                src="/banner-img-1.png"
              />
            </div>
            <div
              id="imgItem"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*1)]`}
            >
              <img
                className="w-[calc(var(--carousel-size)*0.32)] sm:w-[calc(var(--carousel-size)*0.255)] max-w-none h-auto -rotate-90"
                src="/banner-img-2.png"
              />
            </div>
            <div
              id="imgItem"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*2)]`}
            >
              <img
                className="w-[calc(var(--carousel-size)*0.32)] sm:w-[calc(var(--carousel-size)*0.255)] max-w-none h-auto -rotate-90"
                src="/banner-img-3.png"
              />
            </div>
            <div
              id="imgItem"
              className={`absolute left-0 origin-[calc(var(--carousel-size)/2)] rotate-[calc(360deg/4*3)]`}
            >
              <img
                className="w-[calc(var(--carousel-size)*0.32)] sm:w-[calc(var(--carousel-size)*0.255)] max-w-none h-auto -rotate-90"
                src="/banner-img-4.png"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Info box */}
      <div className="flex flex-col absolute left-4 top-4 sm:left-8 sm:top-4 bottom-20 sm:bottom-5 w-1/2 sm:w-1/3">
        <div className="flex flex-col justify-center text-left text-black dark:text-white">
          <div className="info-item">
            <h2 className="text-xl font-bold mb-2">{currentData?.title}</h2>
            <p
              className={`hidden sm:block ${isExpanded ? "" : "sm:line-clamp-3"}`}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea totam
              maxime accusamus enim ducimus, vitae et dignissimos, veniam
              voluptatum cupiditate dolores, nam illum repudiandae tempore
              necessitatibus nostrum debitis iure. Deserunt.
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="hidden sm:block mt-1 text-left text-sm underline cursor-pointer"
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
            <Button className="mt-4 sm:mt-8 cursor-pointer">
              <Link href={`/category/${currentData.link}`} className="block">
                Go now
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Navigation */}
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
    </div>
  );
};

export default CarouselBanner;
