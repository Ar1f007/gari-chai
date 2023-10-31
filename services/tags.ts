import { HOME_SETTINGS_OPTIONS, homePageSectionNameEnum } from '@/lib/constants';

// bring all tags and spread them here
export const TAGS = {
  ...HOME_SETTINGS_OPTIONS,
  homeSettings: {
    all: 'all',
    latestCars: HOME_SETTINGS_OPTIONS.latestCars,
  },
};

// group by parent section - name of the section : Ex: Home page latest cars, home-latest-cars,
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
