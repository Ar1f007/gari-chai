'use client';
import '@/styles/photo-swipe.css';

import { useState } from 'react';
import { TCarSchema } from '@/schema/car';
import { Tab, Tabs } from '@nextui-org/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CarImageGallery from './image-gallery';
import CarVideoGallery from './video-gallery';
import ColorSpecificImages from './color-specific-images';
import { createUrl } from '@/lib/utils';

type MediaType = 'images' | 'videos' | 'colors';

const MediaGallery = ({ car }: { car: TCarSchema }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function setPath(val: MediaType) {
    const params = new URLSearchParams(searchParams);

    if (val === 'images') {
      params.set('media', 'images');
    } else if (val == 'colors') {
      params.set('media', 'colors');
    } else if (val == 'videos') {
      params.set('media', 'videos');
    } else {
      params.set('media', 'images');
    }

    const url = createUrl(pathname, params);

    router.push(url);
  }

  const currentMediaType = searchParams.get('media') || 'images';

  return (
    <div>
      <div className='grid grid-cols-1 place-content-center place-items-center items-center gap-5'>
        <Tabs
          aria-label='Media Tabs'
          radius='full'
          selectedKey={currentMediaType}
          onSelectionChange={(val) => setPath(val as MediaType)}
        >
          <Tab
            key='images'
            title='Images'
          >
            <CarImageGallery
              carName={car.name}
              images={car.imageUrls}
            />
          </Tab>
          <Tab
            key='videos'
            title='Videos'
          >
            <CarVideoGallery videos={car.videos} />
          </Tab>
          <Tab
            key='colors'
            title='Colors'
          >
            <ColorSpecificImages colorImages={car.colors} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default MediaGallery;
