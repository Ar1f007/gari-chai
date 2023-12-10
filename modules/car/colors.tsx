import { title } from '@/components/primitives';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { TCarSchema } from '@/schema/car';
import Image from 'next/image';
import Link from 'next/link';
import SingleColorImageGallery from './single-color-img-gallery';

const Colors = ({ car }: { car: TCarSchema }) => {
  if (!car.colors.length) return null;

  const totalNumOfColors = car.colors.length;

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
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {car.colors.map((color, idx) => (
            <li
              key={`color_${idx}`}
              className='flex flex-col items-center gap-2'
            >
              <Image
                src={color.imageUrls?.[0] || PLACEHOLDER_IMAGE}
                alt={color.name}
                width={200}
                height={200}
                className='rounded object-cover'
              />

              <h4 className='font-medium text-default-500'>{color.name}</h4>
            </li>
          ))}
        </ul>
      )}

      {totalNumOfColors > 1 && (
        <div>
          <Link
            className='text-primary underline'
            href={`/cars/${car.slug}/colors`}
          >
            View all images with colors
          </Link>
        </div>
      )}
    </div>
  );
};
export default Colors;
