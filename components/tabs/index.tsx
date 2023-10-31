"use client";

import { Tabs, Tab } from "@nextui-org/tabs";

import { Slider } from "../slider";
import type { Tabs as TypeTabs } from "@/types";

type TabsContainer = {
  tabs: TypeTabs;
};

export const TabsContainer = ({ tabs }: TabsContainer) => {
  return (
    <div className="flex w-full flex-col mt-6">
      <Tabs
        aria-label="Most searched cars tab"
        items={tabs}
      >
        {(item) => (
          <Tab
            key={item.id}
            title={item.brandName}
          >
            <Slider content={item.content} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
