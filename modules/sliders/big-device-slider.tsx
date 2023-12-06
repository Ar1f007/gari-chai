'use client';

import { Fragment, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';

import { TSlider } from '@/schema/slider';
import { cn } from '@/lib/utils';
import Banner from './banner';

const BigDeviceSlider = ({ sliders }: { sliders: TSlider[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <Fragment>
      <Carousel
        showArrows={false}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        dynamicHeight
        stopOnHover
        interval={6500}
        onChange={(index) => setCurrentSlide(index)}
        selectedItem={currentSlide}
      >
        {sliders.map((slider) => (
          <Link
            href={slider.link}
            className='block'
            key={slider._id}
          >
            <Banner slider={slider} />
          </Link>
        ))}
      </Carousel>
      <ul className='absolute bottom-[60px] right-[60px] flex cursor-pointer space-x-6'>
        {sliders.map((slider, index) => (
          <li
            key={slider._id}
            onClick={() => goToSlide(index)}
          >
            <span
              className={cn(
                'inline-block w-[20ch] max-w-[25ch] border-b-3 border-gray-400 pb-1 text-sm text-white',
                {
                  'border-primary': currentSlide === index,
                },
              )}
            >
              {slider.title}
            </span>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default BigDeviceSlider;
