import Canvas from "@/canvas";
import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import CarouselBanner from "@/components/carousel-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import Customizer from "./(routes)/customizer/page";
export default function Home() {
  return (
    <main>
      <Canvas />
      <Customizer />
      <CarouselBanner />
      <FeaturedProducts />
      <BannerDiscount />
      <ChooseCategory />
      <BannerProduct />
    </main>
  );
}
