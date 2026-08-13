"use client";

import { useRef, useState, MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  className?: string;
  zoom?: number;
}

const LENS_SIZE = 160;
const MAX_TOUCH_ZOOM = 3;
const DOUBLE_TAP_ZOOM = 2.2;
const DOUBLE_TAP_DELAY = 300;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getTouchDistance = (touches: React.TouchList) =>
  Math.hypot(
    touches[1].clientX - touches[0].clientX,
    touches[1].clientY - touches[0].clientY,
  );

const ImageMagnifier = (props: ImageMagnifierProps) => {
  const { src, alt, className, zoom = 2.5 } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomLayerRef = useRef<HTMLDivElement>(null);
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  // Touch pinch/double-tap zoom state lives in refs so gestures don't
  // trigger a React re-render on every frame; the DOM is updated directly.
  const scaleRef = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const pinchStartDistance = useRef(0);
  const pinchStartScale = useRef(1);
  const panStart = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);

  const setTransition = (enabled: boolean) => {
    const el = zoomLayerRef.current;
    if (el) el.style.transition = enabled ? "transform 150ms ease-out" : "none";
  };

  const applyTransform = () => {
    const el = zoomLayerRef.current;
    if (!el) return;
    el.style.transform = `translate(${translateRef.current.x}px, ${translateRef.current.y}px) scale(${scaleRef.current})`;
  };

  const clampTranslate = () => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const maxX = (width * (scaleRef.current - 1)) / 2;
    const maxY = (height * (scaleRef.current - 1)) / 2;
    translateRef.current = {
      x: clamp(translateRef.current.x, -maxX, maxX),
      y: clamp(translateRef.current.y, -maxY, maxY),
    };
  };

  const resetZoom = () => {
    setTransition(true);
    scaleRef.current = 1;
    translateRef.current = { x: 0, y: 0 };
    applyTransform();
  };

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

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      setTransition(false);
      pinchStartDistance.current = getTouchDistance(event.touches);
      pinchStartScale.current = scaleRef.current;
      return;
    }

    if (event.touches.length === 1) {
      if (scaleRef.current > 1) {
        setTransition(false);
        panStart.current = {
          x: event.touches[0].clientX - translateRef.current.x,
          y: event.touches[0].clientY - translateRef.current.y,
        };
      }

      const now = Date.now();
      if (now - lastTapTime.current < DOUBLE_TAP_DELAY) {
        lastTapTime.current = 0;
        setTransition(true);
        if (scaleRef.current > 1) {
          scaleRef.current = 1;
          translateRef.current = { x: 0, y: 0 };
        } else {
          scaleRef.current = DOUBLE_TAP_ZOOM;
        }
        applyTransform();
      } else {
        lastTapTime.current = now;
      }
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      event.preventDefault();
      event.stopPropagation();
      const distance = getTouchDistance(event.touches);
      scaleRef.current = clamp(
        pinchStartScale.current * (distance / pinchStartDistance.current),
        1,
        MAX_TOUCH_ZOOM,
      );
      clampTranslate();
      applyTransform();
      return;
    }

    if (event.touches.length === 1 && scaleRef.current > 1) {
      event.preventDefault();
      event.stopPropagation();
      translateRef.current = {
        x: event.touches[0].clientX - panStart.current.x,
        y: event.touches[0].clientY - panStart.current.y,
      };
      clampTranslate();
      applyTransform();
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 0 && scaleRef.current <= 1) {
      resetZoom();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={zoomLayerRef} className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
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
