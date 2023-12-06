import { TSlider } from '@/schema/slider';
import Image from 'next/image';

const Banner = ({ slider }: { slider: TSlider }) => {
  return (
    <div className='relative min-h-[70vh]'>
      <Image
        src={slider.imgUrl}
        alt={slider.title || 'slider'}
        priority
        className='absolute inset-0 object-cover'
        draggable={false}
        fill
        sizes='100vw'
      />
    </div>
  );
};

export default Banner;
