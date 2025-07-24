"use client";
import styles from "@/components/styles/carousel-banner.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
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

const CarouselBanner = () => {
  const [indexSlider, setIndexSlider] = useState(0);
  const [index, setIndex] = useState(0);
  const onPrevBtn = () => {
    const imgSlider = document.querySelector("#imgSlider");
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
    const imgSlider = document.querySelector("#imgSlider");
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
    <div className={`dark:bg-black bg-[#eeebc7] ${styles.carousel} `}>
      <div id="bgBox">
        <div className={`bg`}></div>
        <div className={`bg`}></div>
        <div className={`bg`}></div>
        <div className={`bg`}></div>
      </div>
      <div className={`${styles.imgBox}`}>
        <div className={`${styles.imgList}`}>
          <div id="imgSlider" className={`${styles.imgSlider}`}>
            {/* Bg */}
            <div
              id="imgBg"
              className={`${styles.imgItem} ${styles.imgBg} rotate-[calc(360deg/4*0)] active`}
            >
              <img src="/banner-bg-1.png" />
            </div>
            <div
              id="imgBg"
              className={`${styles.imgItem} ${styles.imgBg} rotate-[calc(360deg/4*1)]`}
            >
              <img src="/banner-bg-1.png" />
            </div>
            <div
              id="imgBg"
              className={`${styles.imgItem} ${styles.imgBg} rotate-[calc(360deg/4*2)]`}
            >
              <img src="/banner-bg-1.png" />
            </div>
            <div
              id="imgBg"
              className={`${styles.imgItem} ${styles.imgBg} rotate-[calc(360deg/4*3)]`}
            >
              <img src="/banner-bg-1.png" />
            </div>{" "}
            {/* images */}
            <div
              id="imgItem"
              className={`${styles.imgItem} rotate-[calc(360deg/4*0)]`}
            >
              <img className="-rotate-90" src="/banner-img-1.png" />
            </div>
            <div
              id="imgItem"
              className={`${styles.imgItem} rotate-[calc(360deg/4*1)]`}
            >
              <img className="-rotate-90" src="/banner-img-2.png" />
            </div>
            <div
              id="imgItem"
              className={`${styles.imgItem} rotate-[calc(360deg/4*2)]`}
            >
              <img className="-rotate-90" src="/banner-img-3.png" />
            </div>
            <div
              id="imgItem"
              className={`${styles.imgItem} rotate-[calc(360deg/4*3)]`}
            >
              <img className="-rotate-90" src="/banner-img-4.png" />
            </div>
          </div>
        </div>
      </div>
      {/* Info box */}
      <div className="flex flex-col absolute right-8 bottom-5 w-[350px]">
        <div className="flex flex-col justify-center text-black dark:text-white">
          <div className="info-item ">
            <h2 className="text-xl font-bold mb-2">{currentData?.title}</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea totam
              maxime accusamus enim ducimus, vitae et dignissimos, veniam
              voluptatum cupiditate dolores, nam illum repudiandae tempore
              necessitatibus nostrum debitis iure. Deserunt.
            </p>
            <Button className="mt-8 cursor-pointer">
              <Link href={`/category/${currentData.link}`} className="block">
                Go now
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className={`${styles.navigation}`}>
        <span className="prev-btn" onClick={() => onPrevBtn()}>
          <ArrowLeft />
        </span>
        <span className="next-btn" onClick={() => onNextBtn()}>
          <ArrowRight />
        </span>
      </div>
    </div>
  );
};

export default CarouselBanner;
