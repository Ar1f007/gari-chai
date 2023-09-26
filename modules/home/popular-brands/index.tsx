import SectionTitle from "@/components/section-title";
import { BrandList } from "./brand-list";

const PopularBrands = () => {
  return (
    <section className="pt-8 md:pt-16">
      <SectionTitle>Popular Brands</SectionTitle>
      <BrandList />
    </section>
  );
};
export default PopularBrands;
