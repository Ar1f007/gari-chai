'use client';

import '@/styles/photo-swipe.css';

import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { TCarSchema } from '@/schema/car';

import { Gallery, Item } from 'react-photoswipe-gallery';

type SingleColorImageGalleryProps = {
  galleryItem: TCarSchema['colors'][0];
};
const SingleColorImageGallery = ({ galleryItem }: SingleColorImageGalleryProps) => {
  return (
    <div className='space-y-4'>
      <h4 className='text-xl font-medium text-primary'>{galleryItem.name}</h4>
      <Gallery>
        <ul className='flex gap-2'>
          {galleryItem.imageUrls?.map((img, idx) => (
            <li
              key={`color_${idx}`}
              className='flex flex-col items-center gap-2'
            >
              <Item
                original={img.url.originalUrl || PLACEHOLDER_IMAGE}
                thumbnail={img.url.thumbnailUrl || PLACEHOLDER_IMAGE}
                width='600'
                height='400'
              >
                {({ ref, open }) => (
                  <Image
                    // @ts-ignore
                    ref={ref}
                    onClick={open}
                    src={img.url.originalUrl || PLACEHOLDER_IMAGE}
                    alt={galleryItem.name}
                    width={100}
                    height={100}
                    className='aspect-square cursor-zoom-in rounded object-cover'
                  />
                )}
              </Item>
            </li>
          ))}
        </ul>
      </Gallery>
    </div>
  );
};
export default SingleColorImageGallery;
