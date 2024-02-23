/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import ColorSpecificImages from './color-specific-images';
import { TCarSchema } from '@/schema/car';
import { subtitle, title } from '@/components/primitives';
import { cn } from '@/lib/utils';

type ImageGalleryItem = {
  title?: string;
  key: string;
  url: {
    originalUrl: string;
    thumbnailUrl: string;
  };
};

type CarImageGalleryProps = {
  carName?: string;
  additionalImages: ImageGalleryItem[];
  colorImages: TCarSchema['colors'];
};
const CarImageGallery = ({
  carName = 'car',
  additionalImages,
  colorImages,
}: CarImageGalleryProps) => {
  if (!additionalImages.length && !colorImages.length)
    return <p className='text-center text-xl'>No additional images were for this car</p>;

  return (
    <div className={cn({ 'mx-auto max-w-screen-xl space-y-10 ': additionalImages.length > 0 })}>
      <Gallery>
        <div className='flex flex-wrap gap-5'>
          {additionalImages.map((image) => (
            <Item
              key={image.key}
              original={image.url.originalUrl}
              thumbnail={image.url.thumbnailUrl}
              width={500}
              height={500}
            >
              {({ ref, open }) => (
                <img
                  loading='lazy'
                  src={image.url.originalUrl}
                  alt={`${carName} images`}
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
      </Gallery>

      <div className='space-y-5'>
        {/* {!!additionalImages.length && (
          <h3
            className={subtitle({
              className: 'text-center font-medium capitalize',
              fullWidth: true,
            })}
          >
            Colors
          </h3>
        )} */}
        <ColorSpecificImages colorImages={colorImages} />
      </div>
    </div>
  );
};
export default CarImageGallery;
