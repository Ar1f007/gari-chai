import SectionTitle from '@/components/section-title';
import Brand from './brand';
import { getHomePageBrandsBySectionName } from '@/services';
import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { THomeBrandSchema } from '@/schema/common';

const PopularBrands = async () => {
  const brands = await getHomePageBrandsBySectionName(HOME_SETTINGS_OPTIONS.popularBrands);

  console.log('============POPULAR BRANDS===============', brands);

  if (!brands || !brands.length) return null;

  const renderBrand = (brand: THomeBrandSchema) => (
    <li key={brand._id}>
      <Brand brand={brand} />
    </li>
  );

  return (
    <section className='pt-8 md:pt-16'>
      <SectionTitle title='h2'>Popular Brands</SectionTitle>

      <ul className='mt-8 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:mt-12'>
        {brands.map(renderBrand)}
      </ul>
    </section>
  );
};
export default PopularBrands;
