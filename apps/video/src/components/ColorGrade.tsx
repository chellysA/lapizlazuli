import { AbsoluteFill } from "remotion";
import type { PropsWithChildren } from "react";

export const ColorGrade: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AbsoluteFill
      style={{
        filter:
          "sepia(0.16) saturate(0.82) contrast(0.94) brightness(1.05) hue-rotate(-6deg)",
      }}
    >
      {children}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(160deg, rgba(243,207,163,0.25) 0%, rgba(241,199,192,0.1) 45%, rgba(199,210,182,0.15) 100%)",
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(70,50,40,0.35) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
