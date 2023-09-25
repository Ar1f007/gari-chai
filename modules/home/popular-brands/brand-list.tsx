import manifest from "@/data/index.json";
import { Brand } from "./brand";

type Brand = {
  id: string;
  src: string;
  brandName: string;
};

export const BrandList = () => {
  const renderBrand = (brand: Brand) => (
    <li
      key={brand.id}
      className="w-full"
    >
      <Brand {...brand} />
    </li>
  );

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 2xl:mt-12">
      {manifest.popularBrands.map(renderBrand)}
    </ul>
  );
};
