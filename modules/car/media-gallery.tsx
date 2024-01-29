'use client';

import { TCarSchema } from '@/schema/car';
import { Tab, Tabs } from '@nextui-org/tabs';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ColorSlider from './color-slider';
import CarImageGallery from './image-gallery';

type MediaType = 'images' | 'videos' | 'colors';

const MediaGallery = ({ car }: { car: TCarSchema }) => {
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(() => {
    const media = searchParams.get('media') as MediaType;

    switch (media) {
      case 'images':
        return 'images';
      case 'videos':
        return 'videos';
      case 'colors':
        return 'colors';
      default:
        return 'images';
    }
  });

  return (
    <div>
      <div className='flex flex-col items-center gap-5'>
        <Tabs
          aria-label='Media Tabs'
          radius='full'
          selectedKey={selected}
          onSelectionChange={(val) => setSelected(val as string)}
        >
          <Tab
            key='images'
            title='Images'
          >
            <div className='container w-full '>
              <CarImageGallery
                carName={car.name}
                images={car.imageUrls}
              />
            </div>
          </Tab>
          <Tab
            key='videos'
            title='Videos'
          >
            <div>B</div>
          </Tab>
          <Tab
            key='colors'
            title='Colors'
          >
            <div className='container w-full '>
              <ColorSlider car={car} />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default MediaGallery;
