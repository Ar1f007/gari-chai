import { TCarSchema } from '@/schema/car';
import Image from 'next/image';

type Props = {
  car: TCarSchema;
};
const CarImage = (props: Props) => {
  const {
    car: { imageUrls, posterImage, name },
  } = props;

  return (
    <div className='flex flex-col justify-start gap-3 xl:flex-row xl:gap-5'>
      <Image
        src={posterImage.originalUrl}
        alt={name}
        width={500}
        height={500}
        className='h-auto w-auto rounded-lg object-cover md:max-w-[500px]'
        priority
      />
    </div>
  );
};
export default CarImage;
