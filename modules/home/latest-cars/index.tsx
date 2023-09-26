import { link, subtitle } from "@/components/primitives";
import SectionTitle from "@/components/section-title";
import { Slider } from "@/components/slider";

import manifest from "@/data/index.json";
import { routes } from "@/util/routes";
import Link from "next/link";

export const LatestCars = () => {
  return (
    <section className="mt-8 md:mt-16 py-8 px-6 bg-background shadow-md rounded-xl">
      <SectionTitle>Latest Cars</SectionTitle>

      <div className="mt-6">
        <Slider content={manifest.mostSearchedCars[0].content} />
        <Link
          href={routes.latestCars}
          className={link()}
        >
          See all latest cars
        </Link>
      </div>
    </section>
  );
};
