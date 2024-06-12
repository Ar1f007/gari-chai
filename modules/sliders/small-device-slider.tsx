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
      swipeable
      emulateTouch
      autoPlay
      infiniteLoop
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
            width={400}
            height={220}
            priority
          />
        </Link>
      ))}
    </Carousel>
  );
};

export default SmallDeviceSlider;
