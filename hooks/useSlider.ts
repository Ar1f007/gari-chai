'use client';

import { defaultKeenOptions } from '@/lib/keen-slider/keen-slider-options';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

const SLIDE_DURATION = 2000;

type UseSliderProps = {
  options?: KeenSliderOptions;
  autoplay?: boolean;
};

export const useSlider = ({
  options = defaultKeenOptions,
  autoplay = false,
}: UseSliderProps = {}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      ...options,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    autoplay
      ? [
          (slider) => {
            let timeout: ReturnType<typeof setTimeout>;
            let mouseOver = false;
            function clearNextTimeout() {
              clearTimeout(timeout);
            }
            function nextTimeout() {
              clearTimeout(timeout);
              if (mouseOver) return;
              timeout = setTimeout(() => {
                slider.next();
              }, SLIDE_DURATION);
            }
            slider.on('created', () => {
              slider.container.addEventListener('mouseover', () => {
                mouseOver = true;
                clearNextTimeout();
              });
              slider.container.addEventListener('mouseout', () => {
                mouseOver = false;
                nextTimeout();
              });
              nextTimeout();
            });
            slider.on('dragStarted', clearNextTimeout);
            slider.on('animationEnded', nextTimeout);
            slider.on('updated', nextTimeout);
          },
        ]
      : [],
  );

  return { currentSlide, setCurrentSlide, loaded, sliderRef, instanceRef };
};
