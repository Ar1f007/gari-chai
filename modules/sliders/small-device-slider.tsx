'use client';

import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import Image from 'next/image';

import { TSlider } from '@/schema/slider';

const SmallDeviceSlider = ({ sliders }: { sliders: TSlider[] }) => {
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      dynamicHeight
    >
      {sliders.map((slider) => (
        <Link
          key={slider._id}
          href={slider.link}
          className='block'
        >
          <Image
            src={slider.imgUrl}
            alt='slider'
            width={768}
            height={420}
            priority
          />
        </Link>
      ))}
    </Carousel>
  );
};

export default SmallDeviceSlider;
