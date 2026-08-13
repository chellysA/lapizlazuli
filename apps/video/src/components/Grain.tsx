import { AbsoluteFill, useCurrentFrame, random } from "remotion";

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = random(`grain-${frame}`);

  return (
    <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.16 }}>
      <svg width="100%" height="100%">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={Math.floor(seed * 1000)}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </AbsoluteFill>
  );
};
