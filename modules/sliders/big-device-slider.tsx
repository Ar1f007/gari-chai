'use client';

import { Fragment, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import SearchBox from '../search/search-box/search-box';
import { TSlider } from '@/schema/slider';

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
            <Image
              src={slider.imgUrl}
              alt={slider.title || 'slider'}
              priority
              width={1536}
              height={865}
            />
          </Link>
        ))}
      </Carousel>
      {sliders.length && sliders.length > 1 && (
        <ul className='absolute bottom-[20px] right-[20px] flex cursor-pointer space-x-6 xl:bottom-[60px] xl:right-[60px]'>
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
      )}

      <SearchBox />
    </Fragment>
  );
};

export default BigDeviceSlider;
