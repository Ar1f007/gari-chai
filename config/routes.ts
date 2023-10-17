import { SiteConfig } from './site';

export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  brands: '/brands',
  loan: '/loan',

  newCars: '/new-cars',
  popularCars: '/popular-cars',
  latestCars: '/latest-cars',

  videoAndReels: 'video-and-reels',
  buyParts: 'buy-parts',
};

export const navMenuItems: SiteConfig['navMenuItems'] = [
  {
    id: 'menu-0',
    label: 'Home',
    href: routes.home,
    hasChildren: false,
  },
  {
    id: 'menu-1',
    label: 'New Cars',
    href: routes.newCars,
    hasChildren: true,
    children: [
      {
        id: 'menu-1-1',
        label: 'Explore new cars',
        href: routes.newCars,
        hasChildren: false,
      },
      {
        id: 'menu-1-2',
        label: 'Popular cars',
        href: routes.newCars,
        hasChildren: false,
      },
      {
        id: 'menu-1-3',
        label: 'New Launches',
        href: routes.latestCars,
        hasChildren: false,
      },
    ],
  },
  {
    id: 'menu-2',
    label: 'Videos & Reels',
    href: routes.videoAndReels,
    hasChildren: false,
  },
  {
    id: 'menu-3',
    label: 'Buy Parts',
    href: routes.buyParts,
    hasChildren: false,
  },
];
