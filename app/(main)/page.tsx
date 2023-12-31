import { ElectricCars } from '@/modules/home/electric-cars';
import { LatestCars } from '@/modules/home/latest-cars';
import { PopularCars } from '@/modules/home/popular-cars';
import { UpcomingCars } from '@/modules/home/upcoming-cars';
import SliderList from '@/modules/sliders/sliderList';
import PopularBrands from '@/modules/home/popular-brands/popular-brands';

const Homepage = () => {
  return (
    <>
      <section className='mx-auto max-w-screen-2xl px-2 2xl:px-0'>
        <SliderList />
      </section>
      <section className='mx-auto max-w-screen-2xl px-6 2xl:px-0'>
        <LatestCars />
        <UpcomingCars />
        <PopularCars />
        <ElectricCars />
        <PopularBrands />
      </section>
    </>
  );
};

export default Homepage;
