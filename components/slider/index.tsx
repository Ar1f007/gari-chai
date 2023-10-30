'use client';

import 'keen-slider/keen-slider.min.css';
import '@/styles/slider.css';

import { Arrow } from '@/components/Arrow';
import { useSlider } from '@/hooks/useSlider';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const Sliders = ({ children }: Props) => {
  const { sliderRef, loaded, instanceRef, currentSlide } = useSlider();

  return (
    <div className='navigation-wrapper'>
      <ul
        ref={sliderRef}
        className='keen-slider'
      >
        {children}
      </ul>

      {loaded && instanceRef.current && instanceRef.current.track.details.length >= 1 && (
        <>
          <Arrow
            left
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
          />
        </>
      )}
    </div>
  );
};
export default Sliders;
