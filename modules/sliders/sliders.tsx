'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { TSlider } from '@/schema/slider';

import BigDeviceSlider from './big-device-slider';
import SmallDeviceSlider from './small-device-slider';

type HomeSliderProps = {
  sliders: {
    desktopSliders: TSlider[];
    mobileSliders: TSlider[];
  };
};
const HomeSliders = ({ sliders }: HomeSliderProps) => {
  const mobileSliders =
    sliders.mobileSliders.length === 0 ? sliders.desktopSliders : sliders.mobileSliders;

  return (
    <>
      <div className='relative hidden md:block'>
        <BigDeviceSlider sliders={sliders.desktopSliders} />
      </div>
      <div className='md:hidden'>
        <SmallDeviceSlider sliders={mobileSliders} />
      </div>
    </>
  );
};

export default HomeSliders;
