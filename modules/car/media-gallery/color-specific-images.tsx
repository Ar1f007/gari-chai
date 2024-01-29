'use client';

import { TCarSchema } from '@/schema/car';
import { useReducer } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';

type ColorSpecificImagesProps = {
  colorImages: TCarSchema['colors'];
};
const ColorSpecificImages = ({ colorImages }: ColorSpecificImagesProps) => {
  if (!colorImages.length)
    return <p className='text-center text-xl'>Color specific images were not added for this car</p>;

  return (
    <Gallery withCaption>
      <div className='grid grid-cols-2 gap-4 overflow-hidden lg:grid-cols-3'>
        {colorImages.map((imageGroup) =>
          imageGroup.imageUrls.map((image) => (
            <Item<HTMLImageElement>
              key={image.key}
              original={image.url.originalUrl}
              thumbnail={image.url.thumbnailUrl}
              width={500}
              height={500}
              caption={imageGroup.name}
              alt={`${imageGroup.name} images`}
            >
              {({ ref, open }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  loading='lazy'
                  src={image.url.originalUrl}
                  alt={`${imageGroup.name} images`}
                  width={400}
                  height={400}
                  className='aspect-video cursor-pointer rounded-sm object-cover drop-shadow-sm'
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          )),
        )}
      </div>
    </Gallery>
  );
};
export default ColorSpecificImages;
