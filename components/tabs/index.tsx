"use client";

import { Tabs, Tab } from "@nextui-org/tabs";

import manifest from "@/data/index.json";
import { Slider } from "../slider";

export const TabsContainer = () => {
  return (
    <div className="flex w-full flex-col mt-6">
      <Tabs
        aria-label="Most searched cars tab"
        items={manifest.mostSearchedCars}
      >
        {(item) => (
          <Tab
            key={item.id}
            title={item.id}
          >
            <Slider content={item.content} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
