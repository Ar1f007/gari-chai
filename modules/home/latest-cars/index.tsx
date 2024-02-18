import Link from 'next/link';
import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { getHomePageCarsBySection } from '@/services';
import SectionTitle from '@/components/section-title';
import Sliders from '@/components/slider';
import { Car } from '@/components/car/new-car-card';
import { routes } from '@/config/routes';

export const LatestCars = async () => {
  const res = await getHomePageCarsBySection(HOME_SETTINGS_OPTIONS.latestCars);

  if (!res || !res.length) {
    return null;
  }

  return (
    <section className='home-section-wrapper'>
      <SectionTitle>Latest Cars</SectionTitle>

      <div className='mt-5 flex flex-col space-y-5'>
        <Sliders>
          {res.map((item) => (
            <li
              className='keen-slider__slide max-w-[372px] rounded-2xl'
              key={item._id}
            >
              <Car car={item.content} />
            </li>
          ))}
        </Sliders>

        <Link
          href={routes.latestCars}
          className='flex gap-2 text-primary underline-offset-4 hover:underline'
        >
          <span>View all latest cars</span>
        </Link>
      </div>
    </section>
  );
};
