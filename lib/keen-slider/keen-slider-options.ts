import { KeenSliderOptions } from 'keen-slider/react';

const BREAKPOINT_SMALL = '(min-width: 400px)';
const BREAKPOINT_MEDIUM = '(min-width: 1000px)';
const BREAKPOINT_LARGE = '(min-width: 1400px)';

const SLIDE_PER_VIEW_SMALL = 2;
const SLIDE_PER_VIEW_MEDIUM = 3;
const SLIDE_PER_VIEW_LARGE = 4;

const SLIDE_SPACING_SMALL = 15;
const SLIDE_SPACING_MEDIUM = 20;
const SLIDE_SPACING_LARGE = 20;

function generateKeenSliderOptions({
  initial = 0,
  loop = true,
  defaultSlidesPerView = 1,
  defaultSlideSpacing = SLIDE_SPACING_SMALL,
  breakpoints = {},
}): KeenSliderOptions {
  return {
    initial,
    loop,
    breakpoints: {
      ...breakpoints,
    },
    slides: {
      perView: defaultSlidesPerView,
      spacing: defaultSlideSpacing,
    },
    renderMode: 'performance',
  };
}
export const defaultKeenOptions: KeenSliderOptions = generateKeenSliderOptions({
  breakpoints: {
    [BREAKPOINT_SMALL]: {
      slides: { perView: SLIDE_PER_VIEW_SMALL, spacing: SLIDE_SPACING_SMALL },
    },
    [BREAKPOINT_MEDIUM]: {
      slides: { perView: SLIDE_PER_VIEW_MEDIUM, spacing: SLIDE_SPACING_MEDIUM },
    },
    [BREAKPOINT_LARGE]: {
      slides: { perView: SLIDE_PER_VIEW_LARGE, spacing: SLIDE_SPACING_LARGE },
    },
  },
});

export const reviewKeenSliderOptions: KeenSliderOptions = generateKeenSliderOptions({
  loop: false,
  breakpoints: {
    [BREAKPOINT_SMALL]: {
      slides: { perView: 1, spacing: SLIDE_SPACING_SMALL },
    },
    [BREAKPOINT_MEDIUM]: {
      slides: { perView: SLIDE_PER_VIEW_SMALL, spacing: SLIDE_SPACING_MEDIUM },
    },
    [BREAKPOINT_LARGE]: {
      slides: { perView: SLIDE_PER_VIEW_MEDIUM, spacing: SLIDE_SPACING_LARGE },
    },
  },
});
