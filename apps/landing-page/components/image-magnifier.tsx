"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  className?: string;
  zoom?: number;
}

const LENS_SIZE = 160;

const ImageMagnifier = (props: ImageMagnifierProps) => {
  const { src, alt, className, zoom = 2.5 } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    // Visual lens box: kept fully inside the image on screen.
    const lensX = Math.min(Math.max(x - LENS_SIZE / 2, 0), width - LENS_SIZE);
    const lensY = Math.min(Math.max(y - LENS_SIZE / 2, 0), height - LENS_SIZE);
    setLensPosition({ x: lensX, y: lensY });

    const bgWidth = width * zoom;
    const bgHeight = height * zoom;
    setBackgroundSize({ width: bgWidth, height: bgHeight });

    // Zoomed background: tracks the cursor directly (not the clamped lens box)
    // so it can reach all the way to the edges and corners of the image.
    const bgX = Math.min(
      Math.max(x * zoom - LENS_SIZE / 2, 0),
      bgWidth - LENS_SIZE
    );
    const bgY = Math.min(
      Math.max(y * zoom - LENS_SIZE / 2, 0),
      bgHeight - LENS_SIZE
    );
    setBackgroundPosition({ x: -bgX, y: -bgY });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      {showLens && (
        <div
          className="absolute border-2 border-white rounded-full pointer-events-none shadow-lg"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: lensPosition.x,
            top: lensPosition.y,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
            backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
