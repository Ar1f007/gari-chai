import { Suspense } from 'react';
import HomeSliders from './sliders';
import { getSliders } from '@/services/home/sliders';

const SliderList = async () => {
  const sliders = await getSliders();

  const isMobile = true;

  if (!sliders) return;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className='relative'>
        <HomeSliders
          sliders={sliders.desktopSliders}
          isMobile={isMobile}
        />
      </div>
    </Suspense>
  );
};

export default SliderList;
