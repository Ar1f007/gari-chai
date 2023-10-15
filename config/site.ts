import { NavItems } from '@/types';

export type SiteConfig = {
  name: string;
  description: string;
  navMenuItems: NavItems;
  links: {
    github: string;
    twitter: string;
  };
};

export const siteConfig = {
  name: 'Gari Chai',
  description: 'Find Your Right Car',

  navMenuItems: [
    {
      id: 'item-1',
      label: 'Home',
      href: '/',
      hasChildren: false,
    },
    {
      id: 'item-2',
      label: 'New Cars',
      href: '/new-cars',
      hasChildren: true,
      children: [
        {
          id: 'car-1',
          href: '/',
          label: 'Submenu 1',
          hasChildren: false,
        },
        {
          id: 'car-2',
          href: '/s',
          label: 'Submenu 2',
          hasChildren: false,
        },
        {
          id: 'car-3',
          href: '/f',
          label: 'Submenu 3',
          hasChildren: true,
          children: [
            {
              id: 'car-4',
              href: '/d',
              label: 'Submenu 1',
              hasChildren: true,
              children: [
                {
                  id: 'car-1',
                  href: '/',
                  label: 'Submenu 1',
                  hasChildren: false,
                },
                {
                  id: 'car-2',
                  href: '/s',
                  label: 'Submenu 2',
                  hasChildren: false,
                },
                {
                  id: 'car-3',
                  href: '/f',
                  label: 'Submenu 3',
                  hasChildren: true,
                  children: [
                    {
                      id: 'car-4',
                      href: '/d',
                      label: 'Submenu 1',
                      hasChildren: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'item-3',
      label: 'Item 3',
      href: '/todo',
      hasChildren: false,
    },
  ],
  links: {
    github: 'https://github.com/Ar1f007',
    twitter: 'https://github.com/Ar1f007',
  },
} satisfies SiteConfig;
