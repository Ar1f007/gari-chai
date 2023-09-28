import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TabItem = {
  id: string;
  src: string;
  name: string;
  priceMin: string;
  priceMax: string;
};

export type Tab = {
  id: string;
  brandName: string;
  content: Array<TabItem>;
};

export type Tabs = Array<Tab>;
