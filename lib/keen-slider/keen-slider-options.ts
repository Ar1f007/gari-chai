import { KeenSliderOptions } from 'keen-slider/react';

const BREAKPOINT_SMALL = '(min-width: 400px)';
const BREAKPOINT_MEDIUM = '(min-width: 1000px)';
const BREAKPOINT_LARGE = '(min-width: 1400px)';
const SLIDE_PER_VIEW_SMALL = 2;
const SLIDE_PER_VIEW_MEDIUM = 3;
const SLIDE_PER_VIEW_LARGE = 4;
const SLIDE_SPACING_SMALL = 0;
const SLIDE_SPACING_MEDIUM = 0;
const SLIDE_SPACING_LARGE = 0;

export const defaultKeenOptions: KeenSliderOptions = {
  initial: 0,
  loop: true,
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
  slides: {
    perView: 1,
    spacing: SLIDE_SPACING_SMALL,
  },
  renderMode: 'performance',
};
