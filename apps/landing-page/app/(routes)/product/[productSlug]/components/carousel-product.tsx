import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageMagnifier from "@/components/image-magnifier";

interface CarouselProductProps {
  images: {
    id: number;
    url: string;
  }[];
}

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;
  return (
    <div className="sm:px-16">
      <Carousel>
        <CarouselContent>
          {images?.length > 0 &&
            images.map((image) => (
              <CarouselItem key={image.id}>
                <ImageMagnifier
                  src={image.url}
                  alt="Image product"
                  className="rounded-lg"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious></CarouselPrevious>
        <CarouselNext></CarouselNext>
      </Carousel>
    </div>
  );
};
export default CarouselProduct;
