import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// popular brands
export type TBrand = {
  id: string;
  imgSrc: string;
  brandName: string;
};
