import Link from 'next/link';
import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { getHomePageCarsBySection } from '@/services';
import SectionTitle from '@/components/section-title';
import Sliders from '@/components/slider';
import { Car } from '@/components/car/new-car-card';
import { MoveRightIcon } from 'lucide-react';

export const LatestCars = async () => {
  const res = await getHomePageCarsBySection(HOME_SETTINGS_OPTIONS.latestCars);

  if (!res || !res.length) {
    return null;
  }

  return (
    <section className='home-section-wrapper'>
      <SectionTitle>Latest Cars</SectionTitle>

      <div className='flex flex-col space-y-5 mt-5'>
        <Sliders>
          {res.map((item) => (
            <li
              className='keen-slider__slide max-w-[372px] shadow-lg rounded-2xl'
              key={item._id}
            >
              <Car car={item.content} />
            </li>
          ))}
        </Sliders>


        <Link
          href={`/cars/latest`}
          className='text-primary hover:underline flex gap-2 underline-offset-4'
        >
          <span>
            View all Latest Cars
          </span>
        </Link>
      </div>
    </section>
  );
};
