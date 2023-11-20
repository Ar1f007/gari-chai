'use client';

import { Car } from '@/components/car/new-car-card';
import Sliders from '@/components/slider';
import { TCarsByTagName } from '@/schema/common';
import { Tabs, Tab } from '@nextui-org/tabs';

type Props = {
  data: TCarsByTagName[];
};

export const TabSlider = ({ data }: Props) => {
  return (
    <div className='mt-6 flex w-full flex-col'>
      <Tabs
        aria-label='Most searched cars tab'
        items={data}
      >
        {(item) => (
          <Tab
            key={item.name}
            title={item.name}
            className='uppercase'
          >
            <Sliders>
              {item.items.map((item) => (
                <li
                  key={item._id}
                  className='keen-slider__slide max-w-[372px]'
                >
                  <Car car={item.content} />
                </li>
              ))}
            </Sliders>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
