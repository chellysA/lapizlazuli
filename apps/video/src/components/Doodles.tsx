import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "../fonts";

type DoodleProps = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  size?: number;
  rotate?: number;
  color?: string;
  delay?: number;
};

const useDrawIn = (delay: number, duration = 18) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return progress;
};

const wrapperStyle = ({
  top,
  left,
  right,
  bottom,
  size = 60,
  rotate = 0,
}: DoodleProps): React.CSSProperties => ({
  position: "absolute",
  top,
  left,
  right,
  bottom,
  width: size,
  height: size,
  transform: `rotate(${rotate}deg)`,
  pointerEvents: "none",
});

export const Sparkle: React.FC<DoodleProps> = (props) => {
  const progress = useDrawIn(props.delay ?? 0);
  const scale = interpolate(progress, [0, 0.6, 1], [0, 1.2, 1]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 0.9]);
  return (
    <div style={{ ...wrapperStyle(props), opacity, transform: `${wrapperStyle(props).transform} scale(${scale})` }}>
      <svg viewBox="0 0 60 60" fill="none">
        <path
          d="M30 4 L35 25 L56 30 L35 35 L30 56 L25 35 L4 30 L25 25 Z"
          fill={props.color ?? palette.butter}
        />
      </svg>
    </div>
  );
};

export const Star: React.FC<DoodleProps> = (props) => {
  const progress = useDrawIn(props.delay ?? 0, 22);
  return (
    <div style={wrapperStyle(props)}>
      <svg viewBox="0 0 60 60" fill="none">
        <path
          d="M30 6 L36 24 L54 24 L39 35 L45 53 L30 42 L15 53 L21 35 L6 24 L24 24 Z"
          stroke={props.color ?? palette.terracotta}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeDasharray={200}
          strokeDashoffset={interpolate(progress, [0, 1], [200, 0])}
        />
      </svg>
    </div>
  );
};

export const Heart: React.FC<DoodleProps> = (props) => {
  const progress = useDrawIn(props.delay ?? 0, 20);
  const scale = interpolate(progress, [0, 0.7, 1], [0.6, 1.15, 1]);
  return (
    <div style={{ ...wrapperStyle(props), opacity: progress, transform: `${wrapperStyle(props).transform} scale(${scale})` }}>
      <svg viewBox="0 0 60 60" fill="none">
        <path
          d="M30 52 C10 38 4 26 12 16 C18 9 28 10 30 20 C32 10 42 9 48 16 C56 26 50 38 30 52 Z"
          fill={props.color ?? palette.blush}
        />
      </svg>
    </div>
  );
};

export const DashedLine: React.FC<DoodleProps & { width?: number }> = (
  props,
) => {
  const progress = useDrawIn(props.delay ?? 0, 24);
  const w = props.width ?? 120;
  return (
    <div
      style={{
        ...wrapperStyle(props),
        width: w,
        height: 20,
      }}
    >
      <svg viewBox={`0 0 ${w} 20`} fill="none">
        <path
          d={`M2 10 Q ${w / 2} -4, ${w - 2} 10`}
          stroke={props.color ?? palette.sage}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="6 7"
          strokeDashoffset={interpolate(progress, [0, 1], [w, 0])}
        />
      </svg>
    </div>
  );
};

export const Flower: React.FC<DoodleProps> = (props) => {
  const progress = useDrawIn(props.delay ?? 0, 18);
  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  return (
    <div style={{ ...wrapperStyle(props), opacity: progress, transform: `${wrapperStyle(props).transform} scale(${scale})` }}>
      <svg viewBox="0 0 60 60" fill="none">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="30"
            cy="18"
            rx="7"
            ry="12"
            fill={props.color ?? palette.blush}
            transform={`rotate(${deg} 30 30)`}
          />
        ))}
        <circle cx="30" cy="30" r="6" fill={palette.butter} />
      </svg>
    </div>
  );
};
