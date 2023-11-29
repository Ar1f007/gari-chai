import { HOME_SETTINGS_OPTIONS, homePageSectionNameEnum } from '@/lib/constants';

// bring all tags and spread them here
export const TAGS = {
  ...HOME_SETTINGS_OPTIONS,
  homeSettings: {
    all: 'all',
    latestCars: HOME_SETTINGS_OPTIONS.latestCars,
  },
  carBodyTypes: 'car-body-types',
  allAndPopularBrands: 'all-and-popular-brands',
};

// group by "parent page/section" - "name of the child section" :
// Ex: Home page latest cars, home-latest-cars
// Home page - page name
// child section - latest cars
// follow convention if possible

export enum Tags {
  HomeAllSettings = 'home-all',
  HomeLatestCars = 'home-latest-cars',
  HomePopularCars = 'home-popular-cars',
  HomeElectricCars = 'home-electric-cars',
  HomeUpcomingCars = 'home-upcoming-cars',
  HomePopularBrands = 'home-popular-brands',
  HomeMostSearchedCars = 'home-most-searched-cars',

  HomeServices = 'home-services',
}
