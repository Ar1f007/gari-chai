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

export type TNavLink = {
  id: string;
  href: string;
  label: string;
};

export type TDropdownItemWithChildren = {
  hasChildren: true;
  children: TDropdownItem[];
} & TNavLink;

export type TDropdownItemWithoutChildren = {
  hasChildren: false;
} & TNavLink;

export type TDropdownItem = TDropdownItemWithChildren | TDropdownItemWithoutChildren;

export type TDropdownList = TDropdownItem[];

export type NavItems = TDropdownItem[];
