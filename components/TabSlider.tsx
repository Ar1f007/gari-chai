import SectionTitle from "./section-title";
import { TabsContainer } from "./tabs";
import type { Tabs } from "@/types";

type TabSlider = {
  sectionTitle: string;
  tabs: Tabs;
};

export const TabSlider = ({ sectionTitle, tabs }: TabSlider) => {
  return (
    <section className="mt-8 md:mt-16 py-8 px-6 bg-background shadow-md rounded-xl">
      <SectionTitle>{sectionTitle}</SectionTitle>

      <TabsContainer tabs={tabs} />
    </section>
  );
};
