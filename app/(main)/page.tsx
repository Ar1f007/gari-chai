import { ElectricCars } from '@/modules/home/electric-cars';
import Hero from '@/modules/home/hero';
import { LatestCars } from '@/modules/home/latest-cars';
import PopularBrands from '@/modules/home/popular-brands/popular-brands';
import { PopularCars } from '@/modules/home/popular-cars';

const Homepage = () => {
  return (
    <>
      <Hero />

      <section className='mx-auto max-w-screen-2xl px-6 2xl:px-0'>
        <PopularBrands />

        <LatestCars />

        <PopularCars />

        <ElectricCars />
      </section>
    </>
  );
};

export default Homepage;
