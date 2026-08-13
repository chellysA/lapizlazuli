import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fonts, palette } from "../fonts";

type Props = {
  label: string;
  text: string;
  mode: "typewriter" | "static";
  align?: "top" | "bottom";
  typeStart?: number;
  emphasize?: string;
};

const tornEdgeClip =
  "polygon(1% 4%, 8% 0%, 20% 2%, 33% 0%, 47% 3%, 60% 0%, 74% 2%, 88% 0%, 99% 4%, 100% 20%, 98% 35%, 100% 50%, 97% 65%, 100% 80%, 99% 96%, 85% 100%, 70% 98%, 55% 100%, 40% 97%, 25% 100%, 12% 98%, 0% 96%, 2% 80%, 0% 62%, 3% 45%, 0% 28%, 2% 12%)";

export const QuoteCard: React.FC<Props> = ({
  label,
  text,
  mode,
  align = "bottom",
  typeStart = 8,
  emphasize,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - typeStart + 6,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const charsToShow =
    mode === "typewriter"
      ? Math.floor(
          interpolate(frame - typeStart, [0, text.length * 1.4], [0, text.length], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        )
      : text.length;

  const visibleText = text.slice(0, charsToShow);
  const parts = emphasize ? visibleText.split(emphasize) : [visibleText];

  return (
    <div
      style={{
        position: "absolute",
        [align]: 140,
        left: "50%",
        transform: `translateX(-50%) scale(${interpolate(entrance, [0, 1], [0.85, 1])})`,
        opacity: interpolate(entrance, [0, 1], [0, 1]),
        width: "82%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: fonts.handwritten,
          fontSize: 46,
          color: palette.terracotta,
          transform: "rotate(-4deg)",
          marginBottom: 14,
          textShadow:
            "0 0 10px rgba(255,252,247,0.9), 0 0 4px rgba(255,252,247,0.9), 0 3px 8px rgba(90,74,66,0.35)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: palette.paper,
          clipPath: tornEdgeClip,
          padding: "38px 34px 46px",
          boxShadow: "0 18px 40px rgba(90,74,66,0.28)",
          transform: "rotate(1.2deg)",
        }}
      >
        <p
          style={{
            fontFamily: fonts.sans,
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.32,
            color: palette.ink,
            textAlign: "center",
            margin: 0,
          }}
        >
          {emphasize
            ? parts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < parts.length - 1 && (
                    <span
                      style={{
                        fontFamily: fonts.serif,
                        fontStyle: "italic",
                        color: palette.terracotta,
                      }}
                    >
                      {emphasize}
                    </span>
                  )}
                </span>
              ))
            : visibleText}
          {mode === "typewriter" && charsToShow < text.length && (
            <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
          )}
        </p>
      </div>
    </div>
  );
};
