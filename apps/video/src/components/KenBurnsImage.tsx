import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Direction = "in" | "out";

type Props = {
  src: string;
  direction?: Direction;
  panFrom?: "left" | "right" | "center";
};

export const KenBurnsImage: React.FC<Props> = ({
  src,
  direction = "in",
  panFrom = "center",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale =
    direction === "in"
      ? interpolate(frame, [0, durationInFrames], [1, 1.12])
      : interpolate(frame, [0, durationInFrames], [1.12, 1]);

  const panX =
    panFrom === "left"
      ? interpolate(frame, [0, durationInFrames], [-1.5, 1.5])
      : panFrom === "right"
        ? interpolate(frame, [0, durationInFrames], [1.5, -1.5])
        : 0;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${panX}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
