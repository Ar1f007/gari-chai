import Hero from "@/modules/home/hero";
import { LatestCars } from "@/modules/home/latest-cars";
import { MostSearchedCars } from "@/modules/home/most-searched-cars";
import PopularBrands from "@/modules/home/popular-brands";

export default function Home() {
  return (
    <>
      <section className="container mx-auto max-w-screen-2xl px-4 2xl:px-0">
        <Hero />
        <PopularBrands />
        <MostSearchedCars />
        <LatestCars />
      </section>
    </>
  );
}
