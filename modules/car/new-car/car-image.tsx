'use client';

import { TCarSchema } from '@/schema/car';
import { Avatar, AvatarGroup } from '@nextui-org/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

type Props = {
  car: TCarSchema;
};

const CarImage = (props: Props) => {
  const {
    car: { imageUrls, posterImage, name, slug, colors, videos },
  } = props;

  return (
    <div className='max-w-[550px] space-y-5'>
      <Image
        src={posterImage.originalUrl}
        alt={name}
        width={550}
        height={550}
        className='h-auto w-full rounded-lg object-cover'
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
                  count={count - 3}
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
                  count={count - 1}
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
                  count={count - 1}
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

const RenderCount = ({ count, text }: { count: number; text: string }) => {
  return (
    <p className='ms-2 text-small font-medium text-foreground'>
      {count > 0 ? +count : null} {text}
    </p>
  );
};
