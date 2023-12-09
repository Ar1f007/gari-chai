import { SiteConfig } from './site';

export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  brands: '/brands',
  loan: '/loan',

  cars: '/cars',
  newCars: '/cars/new',
  popularCars: '/cars/popular',
  latestCars: '/cars/latest',
  electricCars: '/cars/electric',
  upcomingCars: '/cars/upcoming',

  videoAndReels: 'video-and-reels',
  videos: '/videos',
  reels: '/reels',
  buyParts: '/buy-parts',

  buyAndSellUsedCars: '/buy-and-sell-cars',
  buyUsedCar: '/buy-used-cars',
  sellUsedCar: '/sell-cars',

  services: '/services',

  reviews: '/reviews',

  profileSettings: '/profile-settings',
};

export const navMenuItems: SiteConfig['navMenuItems'] = [
  {
    id: 'menu-1',
    label: 'Cars',
    href: routes.newCars,
    hasChildren: true,
    children: [
      {
        id: 'menu-1-1',
        label: 'Explore cars',
        href: routes.cars,
        hasChildren: false,
      },
      {
        id: 'menu-1-2',
        label: 'Popular cars',
        href: routes.popularCars,
        hasChildren: false,
      },
      {
        id: 'menu-1-3',
        label: 'New Launches',
        href: routes.latestCars,
        hasChildren: false,
      },
      {
        id: 'menu-1-4',
        label: 'Electric Cars',
        href: routes.electricCars,
        hasChildren: false,
      },
      {
        id: 'menu-1-4',
        label: 'Upcoming Cars',
        href: routes.upcomingCars,
        hasChildren: false,
      },
    ],
  },
  {
    id: 'menu-2',
    label: 'Videos & Reels',
    href: routes.videoAndReels,
    hasChildren: true,
    children: [
      {
        id: 'menu-2-1',
        label: 'Videos',
        href: routes.videos,
        hasChildren: false,
      },
      {
        id: 'menu-2-2',
        label: 'Reels',
        href: routes.reels,
        hasChildren: false,
      },
    ],
  },
  {
    id: 'menu-3',
    label: 'Buy Parts',
    href: routes.buyParts,
    hasChildren: false,
  },
  {
    id: 'menu-4',
    label: 'Buy & Sell Used Cars',
    href: routes.buyAndSellUsedCars,
    hasChildren: true,
    children: [
      {
        id: 'menu-4-1',
        label: 'Buy Used Car',
        href: routes.buyUsedCar,
        hasChildren: false,
      },
      {
        id: 'menu-4-2',
        label: 'Sell Car',
        href: routes.sellUsedCar,
        hasChildren: false,
      },
    ],
  },

  {
    id: 'menu-5',
    label: 'Car Services',
    href: routes.services,
    hasChildren: true,
    children: [
      {
        id: 'menu-5-1',
        label: 'Service 1',
        href: '/services',
        hasChildren: false,
      },
    ],
  },

  {
    id: 'menu-6',
    label: 'Car Loan',
    href: routes.loan,
    hasChildren: false,
  },
];
