import { TNavItems } from '@/types';
import { navMenuItems } from './routes';

export type SiteConfig = {
  name: string;
  description: string;
  navMenuItems: TNavItems;
  links: {
    github: string;
    twitter: string;
  };
};

export const siteConfig = {
  name: 'Gari Chai',
  description: 'Find Your Right Car',

  navMenuItems: navMenuItems,
  links: {
    github: 'https://github.com/Ar1f007',
    twitter: 'https://github.com/Ar1f007',
  },
} satisfies SiteConfig;
