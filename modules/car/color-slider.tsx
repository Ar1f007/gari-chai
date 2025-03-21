'use client';

import { TCarSchema } from '@/schema/car';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

const ColorSlider = ({ car }: { car: TCarSchema }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!car.colors.length) return null;

  const sliderItems = car.colors
    .map((color) => {
      if (!color.imageUrls?.length) return [];

      const imgUrlWithColorName = color.imageUrls.map((imgUrl) => ({
        name: color.name,
        imgUrl,
      }));

      return imgUrlWithColorName;
    })
    .flat(1);

  function gotoSlide(idx: number) {
    setCurrentSlide(idx);
  }

  return (
    <div className='mx-auto max-w-2xl rounded border pb-5'>
      <Carousel
        axis='horizontal'
        dynamicHeight
        showIndicators={false}
        showArrows={false}
        showThumbs={false}
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
      >
        {sliderItems.map((item, idx) => (
          <div key={idx}>
            <Image
              src={item.imgUrl.url.originalUrl}
              alt={item.name}
              width={600}
              height={300}
              className='object-cover'
            />
          </div>
        ))}
      </Carousel>

      <div>
        <p className='my-2 text-center font-medium uppercase'>{sliderItems[currentSlide].name}</p>
        <ul className='flex flex-wrap justify-center space-x-3'>
          {sliderItems.map((_, idx) => (
            <li
              key={idx}
              className='flex flex-col items-center gap-2'
            >
              <div
                className={clsx('h-3.5 w-3.5 cursor-pointer rounded-full bg-default-500', {
                  'bg-primary': idx === currentSlide,
                })}
                onClick={() => gotoSlide(idx)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ColorSlider;
