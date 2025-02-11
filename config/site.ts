import { TNavItems } from '@/types';
import { navMenuItems, navigation } from './routes';

export type SiteConfig = {
  name: string;
  description: string;
  navMenuItems: TNavItems;
  links: {
    github: string;
    twitter: string;
  };
  navigation: {
    commonNavItems: TNavItems;
    mobileNavItems: TNavItems;
    desktopNavItems: TNavItems;
  };

  contactInfo: {
    phone: string;
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
  navigation,
  contactInfo: {
    phone: '01633746005',
  },
} satisfies SiteConfig;
