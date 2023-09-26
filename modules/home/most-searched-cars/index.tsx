import SectionTitle from "@/components/section-title";
import { TabsContainer } from "@/components/tabs";

export const MostSearchedCars = () => {
  return (
    <section className="mt-8 md:mt-16 py-8 px-6 bg-background shadow-md rounded-xl">
      <SectionTitle>The Most Searched Cars</SectionTitle>

      <TabsContainer />
    </section>
  );
};
