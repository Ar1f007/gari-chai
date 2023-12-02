import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { getHomePageCarsBySection } from '@/services';
import SectionTitle from '@/components/section-title';
import Sliders from '@/components/slider';
import { Car } from '@/components/car/new-car-card';

export const PopularCars = async () => {
  const res = await getHomePageCarsBySection(HOME_SETTINGS_OPTIONS.popularCars);

  if (!res || res.length === 0) {
    return null;
  }

  return (
    <section className='home-section-wrapper'>
      <SectionTitle>Popular Cars</SectionTitle>

      <div className='mt-6'>
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
      </div>
    </section>
  );
};
