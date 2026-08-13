import { staticFile } from "remotion";
import { KenBurnsImage } from "../components/KenBurnsImage";
import { ColorGrade } from "../components/ColorGrade";
import { QuoteCard } from "../components/QuoteCard";
import { Sparkle, Star, Heart, DashedLine } from "../components/Doodles";

const QUOTE = "Amiga necesito hacer una sesión de fotos para mi emprendimiento";

export const IntroSlideOne: React.FC = () => {
  return (
    <>
      <ColorGrade>
        <KenBurnsImage src={staticFile("1.jpeg")} direction="in" panFrom="left" />
      </ColorGrade>
      <Star top={110} left={70} size={54} delay={4} rotate={-8} />
      <Sparkle top={170} right={90} size={44} delay={20} />
      <DashedLine top={280} left={60} width={140} delay={12} />
      <QuoteCard
        label="yo:"
        text={QUOTE}
        mode="typewriter"
        typeStart={10}
        emphasize="sesión de fotos"
      />
    </>
  );
};

export const IntroSlideTwo: React.FC = () => {
  return (
    <>
      <ColorGrade>
        <KenBurnsImage src={staticFile("2.jpg")} direction="out" panFrom="right" />
      </ColorGrade>
      <Heart top={150} right={80} size={46} delay={6} rotate={6} />
      <Sparkle top={260} left={70} size={38} delay={16} />
      <QuoteCard
        label="yo:"
        text={QUOTE}
        mode="static"
        typeStart={0}
        emphasize="sesión de fotos"
      />
    </>
  );
};
