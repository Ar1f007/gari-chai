import { title } from '@/components/primitives';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { TCarSchema } from '@/schema/car';

import SingleColorImageGallery from './single-color-img-gallery';
import Image from 'next/image';
import Link from 'next/link';

const Colors = ({ car }: { car: TCarSchema }) => {
  if (!car.colors.length) return null;

  const totalNumOfColors = car.colors.length;

  const hasImages = totalNumOfColors > 1 && car.colors.some((car) => car.imageUrls.length >= 1);

  return (
    <div className='mt-8 flex flex-col space-y-4 rounded-xl bg-foreground-50 p-6'>
      <h2 className={title({ size: 'xs' })}>{car.name} Colors</h2>

      <p>
        {totalNumOfColors > 1 && (
          <>
            {car.name} is available in {totalNumOfColors} colors.
          </>
        )}
      </p>

      {totalNumOfColors == 1 ? (
        <SingleColorImageGallery galleryItem={car.colors[0]} />
      ) : (
        <ul className='flex flex-wrap gap-8 sm:flex-row'>
          {car.colors.map((color, idx) => (
            <li
              key={`color_${idx}`}
              className='flex flex-col items-center gap-2'
            >
              <Image
                src={color.imageUrls?.[0]?.url.thumbnailUrl || PLACEHOLDER_IMAGE}
                alt={color.name}
                width={100}
                height={200}
                className='aspect-square rounded object-cover'
              />

              <h4 className='font-medium text-default-500'>{color.name}</h4>
            </li>
          ))}
        </ul>
      )}

      {hasImages && (
        <div>
          <Link
            className='text-primary underline'
            href={`/cars/${car.slug}/gallery?media=colors`}
          >
            View all images with colors
          </Link>
        </div>
      )}
    </div>
  );
};
export default Colors;
