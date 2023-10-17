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

export type TNavLinkWithChildren = {
  hasChildren: true;
  children: TNavItem[];
} & TNavLink;

export type TNavLinkWithoutChildren = {
  hasChildren: false;
} & TNavLink;

export type TNavItem = TNavLinkWithChildren | TNavLinkWithoutChildren;

export type TNavItems = TNavItem[];
