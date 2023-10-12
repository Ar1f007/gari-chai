import Hero from '@/modules/home/hero';
import manifest from '@/data/index.json';
import PopularBrands from '@/modules/home/popular-brands/popular-brands';

const Homepage = () => {
  return (
    <>
      <Hero />

      <section className='container mx-auto max-w-screen-2xl'>
        <PopularBrands />
      </section>
    </>
  );
};
export default Homepage;
