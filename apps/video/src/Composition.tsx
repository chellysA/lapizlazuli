import { AbsoluteFill, Composition, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { Grain } from "./components/Grain";
import { IntroSlideOne, IntroSlideTwo } from "./scenes/IntroScene";
import { ReplySlide } from "./scenes/ReplyScene";
import { MontageSlide } from "./scenes/MontageScene";
import { palette } from "./fonts";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

const INTRO1_DURATION = 90;
const INTRO2_DURATION = 100;
const REPLY_DURATION = 90;
const MONTAGE_DURATION = 55;

const T_INTRO1_INTRO2 = 20;
const T_INTRO2_REPLY = 20;
const T_REPLY_MONTAGE = 18;
const T_MONTAGE = 16;

const MONTAGE_IMAGES: {
  src: string;
  direction: "in" | "out";
  panFrom: "left" | "right" | "center";
}[] = [
  { src: "4.jpeg", direction: "in", panFrom: "right" },
  { src: "5.jpeg", direction: "out", panFrom: "left" },
  { src: "6.jpeg", direction: "in", panFrom: "center" },
  { src: "7.jpeg", direction: "out", panFrom: "right" },
  { src: "8.jpg", direction: "in", panFrom: "left" },
  { src: "9.jpeg", direction: "out", panFrom: "center" },
  { src: "10.jpg", direction: "in", panFrom: "right" },
];

const totalDuration =
  INTRO1_DURATION +
  INTRO2_DURATION +
  REPLY_DURATION +
  MONTAGE_IMAGES.length * MONTAGE_DURATION -
  (T_INTRO1_INTRO2 +
    T_INTRO2_REPLY +
    T_REPLY_MONTAGE +
    (MONTAGE_IMAGES.length - 1) * T_MONTAGE);

export const MyComposition = () => {
  return (
    <Composition
      id="PhotoshootVlog"
      component={PhotoshootVlog}
      durationInFrames={totalDuration}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

export const PhotoshootVlog: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.cream }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO1_DURATION}>
          <IntroSlideOne />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T_INTRO1_INTRO2 })}
        />

        <TransitionSeries.Sequence durationInFrames={INTRO2_DURATION}>
          <IntroSlideTwo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T_INTRO2_REPLY })}
        />

        <TransitionSeries.Sequence durationInFrames={REPLY_DURATION}>
          <ReplySlide />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T_REPLY_MONTAGE })}
        />

        {MONTAGE_IMAGES.reduce<React.ReactNode[]>((nodes, img, i) => {
          nodes.push(
            <TransitionSeries.Sequence
              key={img.src}
              durationInFrames={MONTAGE_DURATION}
            >
              <MontageSlide
                src={staticFile(img.src)}
                direction={img.direction}
                panFrom={img.panFrom}
                variant={i}
              />
            </TransitionSeries.Sequence>,
          );
          if (i < MONTAGE_IMAGES.length - 1) {
            nodes.push(
              i % 2 === 0 ? (
                <TransitionSeries.Transition
                  key={`${img.src}-t`}
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: T_MONTAGE })}
                />
              ) : (
                <TransitionSeries.Transition
                  key={`${img.src}-t`}
                  presentation={wipe({ direction: "from-left" })}
                  timing={linearTiming({ durationInFrames: T_MONTAGE })}
                />
              ),
            );
          }
          return nodes;
        }, [])}
      </TransitionSeries>
      <Grain />
    </AbsoluteFill>
  );
};
