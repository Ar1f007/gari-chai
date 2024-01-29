import { TCarSchema } from '@/schema/car';
import { Avatar, AvatarGroup } from '@nextui-org/avatar';
import Image from 'next/image';
import Link from 'next/link';

type SelectedItem = {
  type: 'image' | 'video' | 'panorama';
  src: string;
};

type Props = {
  car: TCarSchema;
};

const CarImage = (props: Props) => {
  const {
    car: { imageUrls, posterImage, name, slug },
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

      {imageUrls.length > 0 && (
        <Link
          href={`/cars/${slug}/gallery?media=image`}
          className='inline-block'
        >
          <AvatarGroup
            isBordered
            max={3}
            total={imageUrls.length}
            radius='sm'
            size='lg'
            isGrid
            title='Avatar'
          >
            {imageUrls.map((img, idx) => (
              <Avatar
                key={idx}
                src={img.url.thumbnailUrl}
              />
            ))}
          </AvatarGroup>
        </Link>
      )}
    </div>
  );
};
export default CarImage;
