import SectionTitle from '@/components/section-title';
import manifest from '@/data/index.json';
import Brand from './brand';
import { TBrand } from '@/types';

const PopularBrands = () => {
  const renderBrand = (brand: TBrand) => (
    <li
      key={brand.id}
      className='w-full'
    >
      <Brand {...brand} />
    </li>
  );

  return (
    <section className='pt-8 md:pt-16'>
      <SectionTitle>Popular Brands</SectionTitle>

      <ul className='mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:mt-12'>
        {manifest.popularBrands.map(renderBrand)}
      </ul>
    </section>
  );
};
export default PopularBrands;
