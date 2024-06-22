import SectionTitle from '@/components/section-title';
import Sliders from '@/components/slider';
import { routes } from '@/config/routes';
import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { getHomePageCarPartsBySectionName } from '@/services/home/car-parts';
import Link from 'next/link';
import CarPartCard from './car-part-card';

const HomeCarParts = async () => {
  const carParts = await getHomePageCarPartsBySectionName(HOME_SETTINGS_OPTIONS.carParts);

  console.log('==============CAR PARTS==========', carParts);

  if (!carParts || !carParts.length) {
    return null;
  }

  return (
    <section className='home-section-wrapper'>
      <SectionTitle title='h2'>Parts</SectionTitle>

      <div className='mt-5 flex flex-col space-y-5'>
        <Sliders>
          {carParts.map((item) => (
            <li
              className='keen-slider__slide max-w-[372px] rounded-2xl'
              key={item._id}
            >
              <CarPartCard
                key={item._id}
                carPart={item.content}
              />
            </li>
          ))}
        </Sliders>

        <Link
          href={routes.carParts}
          className='flex gap-2 text-primary underline-offset-4 hover:underline'
        >
          <span>View all parts</span>
        </Link>
      </div>
    </section>
  );
};
export default HomeCarParts;
