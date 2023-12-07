'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { TSlider } from '@/schema/slider';

import BigDeviceSlider from './big-device-slider';

const HomeSliders = ({ sliders, isMobile }: { sliders: TSlider[]; isMobile: boolean }) => {
  return isMobile ? null : <BigDeviceSlider sliders={sliders} />;
};

export default HomeSliders;
