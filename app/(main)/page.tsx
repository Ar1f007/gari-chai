import Hero from "@/modules/home/hero";
import PopularBrands from "@/modules/home/popular-brands";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="container mx-auto max-w-screen-2xl pt-8 md:pt-16 px-4 2xl:px-0">
        <PopularBrands />
      </section>
    </>
  );
}
