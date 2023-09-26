import SectionTitle from "@/components/section-title";
import { TabsContainer } from "@/components/tabs";

export const MostSearchedCars = () => {
  return (
    <section className="mb-28 mt-8 md:mt-16 py-8 px-6 bg-white shadow-md rounded-xl">
      <SectionTitle>The Most Searched Cars</SectionTitle>

      <TabsContainer />
    </section>
  );
};
