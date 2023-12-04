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

/**
 * API
 */
export type TApiData<T> = {
  data: T;
  status: 'success';
};

type TApiErrorData = {
  status: 'error' | 'fail';
  message: string;
};

type FieldError = {
  fieldName: string;
  message: string;
};

export type TApiValidationError = {
  status: 'validationError';
  message: string;
  errors: FieldError[];
};

export type TApiError = TApiErrorData | TApiValidationError;

export type QueryParams = {
  car: string;
  budget: string;
  bodyType: string;
  brand: string;
  model: string;
  city: string;
  query: string;
  page: string;
  limit: string;
  scope: 'new-car' | 'used-car' | 'global';
};

export type TPagination = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  nextPage: number | null;
};

export type TCarsPageParams = {
  searchParams: Partial<QueryParams>;
};
