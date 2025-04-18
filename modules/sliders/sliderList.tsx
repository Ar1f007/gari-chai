import { Suspense } from 'react';
import HomeSliders from './sliders';
import { getSliders } from '@/services/home/sliders';

const SliderList = async () => {
  const sliders = await getSliders();

  if (!sliders) return;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <HomeSliders sliders={sliders} />
    </Suspense>
  );
};

export default SliderList;
