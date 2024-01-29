'use client';

import { TCarSchema } from '@/schema/car';
import { Avatar, AvatarGroup } from '@nextui-org/avatar';
import Image from 'next/image';
import Link from 'next/link';
import RenderCount from '../render-count';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

type Props = {
  car: TCarSchema;
};

const CarImage = (props: Props) => {
  const {
    car: { imageUrls, posterImage, name, slug, colors, videos },
  } = props;

  return (
    <div className='max-w-[500px] space-y-5'>
      <Image
        src={posterImage.originalUrl}
        alt={name}
        width={500}
        height={500}
        className='h-auto w-full rounded-lg object-cover md:max-w-[500px]'
        priority
      />

      <div className='flex flex-wrap gap-x-2 gap-y-5'>
        {imageUrls.length > 0 && (
          <Link
            href={`/cars/${slug}/gallery?media=images`}
            className='inline-block'
          >
            <AvatarGroup
              isBordered
              max={3}
              total={imageUrls.length}
              radius='sm'
              size='lg'
              renderCount={(count) => (
                <RenderCount
                  count={count}
                  text='images'
                />
              )}
            >
              {imageUrls.map((img, idx) => (
                <Avatar
                  key={idx}
                  src={img.url.thumbnailUrl || PLACEHOLDER_IMAGE}
                  fallback='images'
                />
              ))}
            </AvatarGroup>
          </Link>
        )}

        {!!videos.length && (
          <Link
            href={`/cars/${slug}/gallery?media=videos`}
            className='inline-block'
          >
            <AvatarGroup
              isBordered
              max={1}
              total={videos.length}
              radius='sm'
              size='lg'
              renderCount={(count) => (
                <RenderCount
                  count={count}
                  text='videos'
                />
              )}
            >
              {videos.map((img, idx) => (
                <Avatar
                  key={idx}
                  src={img.thumbnailImage?.originalUrl || PLACEHOLDER_IMAGE}
                  fallback={'videos'}
                />
              ))}
            </AvatarGroup>
          </Link>
        )}

        {!!colors.length && (
          <Link
            href={`/cars/${slug}/gallery?media=colors `}
            className='inline-block'
          >
            <AvatarGroup
              isBordered
              max={1}
              total={colors.length}
              radius='sm'
              size='lg'
              renderCount={(count) => (
                <RenderCount
                  count={count}
                  text='colors'
                />
              )}
            >
              {colors.map((img, idx) => (
                <Avatar
                  key={idx}
                  src={img.imageUrls[0]?.url.thumbnailUrl || PLACEHOLDER_IMAGE}
                  fallback='color'
                />
              ))}
            </AvatarGroup>
          </Link>
        )}
      </div>
    </div>
  );
};
export default CarImage;
