import { Suspense } from 'react';

import { ElectricCars } from '@/modules/home/electric-cars';
import { LatestCars } from '@/modules/home/latest-cars';
import { PopularCars } from '@/modules/home/popular-cars';
import { UpcomingCars } from '@/modules/home/upcoming-cars';

import CampaignPromo from '@/modules/sliders/campaign-promo';
import PopularBrands from '@/modules/home/popular-brands/popular-brands';
import SliderList from '@/modules/sliders/sliderList';
import HomeCarParts from '@/modules/home/car-parts';
import HomeSectionCardSkeleton from '@/components/skeleton/home-section-card-skeleton';
import PopularBrandsSkeleton from '@/components/skeleton/popular-brand-skeleton';

const Homepage = () => {
  return (
    <>
      <section className='mx-auto max-w-screen-2xl px-2 2xl:px-0'>
        <SliderList />
      </section>
      <section className='mx-auto max-w-screen-2xl px-6 2xl:px-0'>

        <Suspense fallback={<HomeSectionCardSkeleton cardCount={4} />}>
          <LatestCars />
        </Suspense>

        <Suspense fallback={<HomeSectionCardSkeleton cardCount={4} />}>
          <UpcomingCars />
        </Suspense>

        <Suspense fallback={<HomeSectionCardSkeleton cardCount={4} />}>
          <PopularCars />
        </Suspense>

        <Suspense fallback={<HomeSectionCardSkeleton cardCount={4} />}>
          <ElectricCars />
        </Suspense>

        <Suspense fallback={<HomeSectionCardSkeleton cardCount={4} />}>
          <HomeCarParts />
        </Suspense>

        <Suspense fallback={<PopularBrandsSkeleton count={4} />}>
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
