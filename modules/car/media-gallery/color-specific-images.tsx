'use client';

import { subtitle } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import { Gallery, Item } from 'react-photoswipe-gallery';

type ColorSpecificImagesProps = {
  colorImages: TCarSchema['colors'];
};
const ColorSpecificImages = ({ colorImages }: ColorSpecificImagesProps) => {
  if (!colorImages.length)
    return <p className='text-center text-xl'>Color specific images were not added for this car</p>;

  return (
    <Gallery withCaption>
      <div className='mx-auto flex max-w-screen-xl flex-wrap gap-5'>
        {colorImages.map((imageGroup, idx) => {
          return (
            <div
              className='space-y-5'
              key={idx}
            >
              <h3 className={subtitle({ className: 'font-medium capitalize' })}>
                {imageGroup.name}
              </h3>
              <div className='flex flex-wrap gap-5'>
                {imageGroup.imageUrls.map((image) => (
                  <Item<HTMLImageElement>
                    key={image.key}
                    original={image.url.thumbnailUrl}
                    thumbnail={image.url.thumbnailUrl}
                    width={500}
                    height={500}
                    caption={imageGroup.name}
                    alt={`images for ${imageGroup.name} color`}
                  >
                    {({ ref, open }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        loading='lazy'
                        src={image.url.thumbnailUrl}
                        alt={`images for ${imageGroup.name} color`}
                        width={400}
                        height={400}
                        className='aspect-video cursor-pointer rounded-sm object-cover drop-shadow-sm'
                        ref={ref}
                        onClick={open}
                      />
                    )}
                  </Item>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Gallery>
  );
};
export default ColorSpecificImages;
