import { KenBurnsImage } from "../components/KenBurnsImage";
import { ColorGrade } from "../components/ColorGrade";
import {
  Sparkle,
  Star,
  Heart,
  DashedLine,
  Flower,
} from "../components/Doodles";

type Props = {
  src: string;
  direction: "in" | "out";
  panFrom: "left" | "right" | "center";
  variant: number;
};

const DOODLE_LAYOUTS: React.FC<{ delayBase: number }>[] = [
  ({ delayBase }) => (
    <>
      <Sparkle top={120} left={70} size={40} delay={delayBase} />
      <DashedLine top={240} right={50} width={130} delay={delayBase + 8} />
    </>
  ),
  ({ delayBase }) => (
    <>
      <Star top={140} right={80} size={46} delay={delayBase} rotate={-6} />
      <Heart top={280} left={90} size={36} delay={delayBase + 10} />
    </>
  ),
  ({ delayBase }) => (
    <>
      <Flower top={110} left={80} size={42} delay={delayBase} />
      <Sparkle top={260} right={70} size={34} delay={delayBase + 8} />
    </>
  ),
  ({ delayBase }) => (
    <>
      <DashedLine top={130} left={60} width={150} delay={delayBase} />
      <Star top={250} right={90} size={38} delay={delayBase + 10} rotate={12} />
    </>
  ),
];

export const MontageSlide: React.FC<Props> = ({
  src,
  direction,
  panFrom,
  variant,
}) => {
  const Layout = DOODLE_LAYOUTS[variant % DOODLE_LAYOUTS.length];
  return (
    <>
      <ColorGrade>
        <KenBurnsImage src={src} direction={direction} panFrom={panFrom} />
      </ColorGrade>
      <Layout delayBase={6} />
    </>
  );
};
