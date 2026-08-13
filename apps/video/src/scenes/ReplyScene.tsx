import { staticFile } from "remotion";
import { KenBurnsImage } from "../components/KenBurnsImage";
import { ColorGrade } from "../components/ColorGrade";
import { QuoteCard } from "../components/QuoteCard";
import { Sparkle, Star, Flower } from "../components/Doodles";

export const ReplySlide: React.FC = () => {
  return (
    <>
      <ColorGrade>
        <KenBurnsImage src={staticFile("3.jpeg")} direction="in" panFrom="center" />
      </ColorGrade>
      <Sparkle top={100} left={80} size={40} delay={2} />
      <Sparkle top={140} right={70} size={30} delay={10} />
      <Star top={220} right={100} size={44} delay={18} rotate={10} />
      <Flower top={90} left={160} size={40} delay={24} />
      <QuoteCard label="ella:" text="No se diga más" mode="typewriter" typeStart={8} />
    </>
  );
};
