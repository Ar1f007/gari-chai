import { TabSlider } from "@/components/TabSlider";
import Hero from "@/modules/home/hero";
import { LatestCars } from "@/modules/home/latest-cars";

import PopularBrands from "@/modules/home/popular-brands";
import manifest from "@/data/index.json";

export default function Home() {
  return (
    <>
      <section className="container mx-auto max-w-screen-2xl px-4 2xl:px-0">
        <Hero />
        <PopularBrands />

        <TabSlider
          sectionTitle="Most Searched Cars"
          tabs={manifest.mostSearchedCars}
        />

        <LatestCars />

        <TabSlider
          sectionTitle="Electric Cars"
          tabs={manifest.mostSearchedCars}
        />
      </section>
    </>
  );
}
