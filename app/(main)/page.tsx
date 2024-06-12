import { Suspense } from 'react';

import { ElectricCars } from '@/modules/home/electric-cars';
import { LatestCars } from '@/modules/home/latest-cars';
import { PopularCars } from '@/modules/home/popular-cars';
import { UpcomingCars } from '@/modules/home/upcoming-cars';

import CampaignPromo from '@/modules/sliders/campaign-promo';
import PopularBrands from '@/modules/home/popular-brands/popular-brands';
import SliderList from '@/modules/sliders/sliderList';
import HomeCarParts from '@/modules/home/car-parts';

const Homepage = () => {
  return (
    <>
      <section className='mx-auto max-w-screen-2xl px-2 2xl:px-0'>
        <SliderList />
      </section>
      <section className='mx-auto max-w-screen-2xl px-6 2xl:px-0'>
        <Suspense>
          <LatestCars />
        </Suspense>

        <Suspense>
          <UpcomingCars />
        </Suspense>

        <Suspense>
          <PopularCars />
        </Suspense>

        <Suspense>
          <ElectricCars />
        </Suspense>

        <Suspense>
          <HomeCarParts />
        </Suspense>

        <Suspense>
          <PopularBrands />
        </Suspense>
      </section>

      <Suspense>
        <CampaignPromo />
      </Suspense>
    </>
  );
};

export default Homepage;
