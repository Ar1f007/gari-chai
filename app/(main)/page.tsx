import Hero from '@/modules/home/hero';
import PopularBrands from '@/modules/home/popular-brands/popular-brands';

const Homepage = () => {
  return (
    <>
      <Hero />

      <section className='mx-auto max-w-screen-2xl px-6 2xl:px-0'>
        <PopularBrands />
      </section>
    </>
  );
};
export default Homepage;
