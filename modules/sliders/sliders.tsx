'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

// import { useMediaQuery } from '@/hooks/useMediaQuery';
import { TSlider } from '@/schema/slider';

import mediaQuery from 'css-mediaquery';

import BigDeviceSlider from './big-device-slider';

const HomeSliders = ({ sliders }: { sliders: TSlider[] }) => {
  const isSmallDevice = mediaQuery.match('screen and (max-width: 600px)', {});

  // console.log(isSmallDevice);
  return null;
  // const isSmallDevice = useMediaQuery('(max-width: 768px)');

  // if (typeof window === 'undefined') return null;

  // return isSmallDevice ? null : <BigDeviceSlider sliders={sliders} />;
};

export default HomeSliders;
