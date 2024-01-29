/* eslint-disable @next/next/no-img-element */
import { Gallery, Item } from 'react-photoswipe-gallery';

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
  images: ImageGalleryItem[];
};
const CarImageGallery = ({ carName = 'car', images }: CarImageGalleryProps) => {
  if (!images.length)
    return <p className='text-center text-xl'>No additional images were for this car</p>;

  return (
    <Gallery>
      <div className='grid grid-cols-2 gap-4 overflow-hidden lg:grid-cols-3'>
        {images.map((image) => (
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
  );
};
export default CarImageGallery;
