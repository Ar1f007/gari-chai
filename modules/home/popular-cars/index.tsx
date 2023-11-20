import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { getHomePageCarsBySection } from '@/services';
import SectionTitle from '@/components/section-title';
import { subtitle } from '@/components/primitives';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';
import Sliders from '@/components/slider';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Car } from '@/components/car/new-car-card';

export const PopularCars = async () => {
  const res = await getHomePageCarsBySection(HOME_SETTINGS_OPTIONS.popularCars);

  if (!res || res.length === 0) {
    return null;
  }

  return (
    <section className='mt-8 rounded-xl bg-background px-2 py-8 shadow-md md:mt-16'>
      <SectionTitle>Popular Cars</SectionTitle>

      <div className='mt-6'>
        <Sliders>
          {res.map((item) => (
            <li
              className='keen-slider__slide max-w-[372px]'
              key={item._id}
            >
              <Car car={item.content} />
            </li>
          ))}
        </Sliders>
      </div>
    </section>
  );
};
