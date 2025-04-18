'use client';

import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { TCarPartSchema } from '@/schema/car-part';
import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';
import { useMemo, useState } from 'react';

type Props = {
  posterImg: TCarPartSchema['posterImage'];
  additionalImages: TCarPartSchema['imageUrls'];
};

const CarPartImages = ({ additionalImages, posterImg }: Props) => {
  const [selectedImage, setSelectedImage] = useState(posterImg);

  const images = useMemo(() => {
    const urls = [{ thumbnailUrl: posterImg.thumbnailUrl, originalUrl: posterImg.originalUrl }];

    (additionalImages || []).map((img) =>
      urls.push({ thumbnailUrl: img.url.thumbnailUrl, originalUrl: img.url.originalUrl }),
    );

    return urls;
  }, []);

  return (
    <div className='space-y-5'>
      <Image
        src={selectedImage.originalUrl}
        alt='parts'
        width={400}
        height={300}
        className='w-full rounded object-contain shadow-sm'
      />

      <ul className='flex flex-wrap gap-5'>
        {images.map((img, idx) => (
          <li
            key={idx}
            className='cursor-pointer'
            onClick={() => setSelectedImage(img)}
          >
            <Avatar
              isBordered
              radius='sm'
              src={img.thumbnailUrl || PLACEHOLDER_IMAGE}
              size='lg'
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CarPartImages;
