'use client';

import { subtitle } from '@/components/primitives';
import Sliders from '@/components/slider';
import { routes } from '@/config/routes';
import { TCarsByTagName } from '@/schema/common';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Tabs, Tab } from '@nextui-org/tabs';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

type Props = {
  data: TCarsByTagName[];
};

export const TabSlider = ({ data }: Props) => {
  const router = useRouter();

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
                  <Card className='cursor-pointer border-1 border-slate-200 shadow-md'>
                    <CardHeader className='relative h-[200px]'>
                      <Image
                        src={item.content.posterImage.thumbnailUrl}
                        alt='cars'
                        fill
                        sizes='100%'
                        className='object-cover'
                      />
                    </CardHeader>
                    <CardBody>
                      <h2 className={subtitle({ className: 'mb-6' })}>{item.content.name}</h2>

                      <Button
                        color='primary'
                        variant='bordered'
                        onClick={() => router.push(routes.electricCars)}
                        className='text-lg capitalize'
                      >
                        View details
                      </Button>
                    </CardBody>
                  </Card>
                </li>
              ))}
            </Sliders>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
