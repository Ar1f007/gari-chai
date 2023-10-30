import { z } from 'zod';

export const MAX_FILE_SIZE_LIMIT = 300000; // 300 kb

export const API_BASE_URL = 'http://localhost:8000';

export const API_V1_URL = API_BASE_URL + '/api/v1';

export const PRIMARY_COLOR = '#3C50E0';

export const SearchParams = {
  getAllBrands: 'get=all',
};

// Home settings

export const HOME_SETTINGS_OPTIONS = {
  latestCars: 'latest-cars',
  popularCars: 'popular-cars',
  electricCars: 'electric-cars',
  services: 'services',
  mostSearched: 'most-searched',
  popularBrands: 'popular-brands',
};

export const settingsSectionToAddOptions = [
  {
    value: HOME_SETTINGS_OPTIONS.latestCars,
    label: 'Latest Car',
  },
  {
    value: HOME_SETTINGS_OPTIONS.popularCars,
    label: 'Popular Car',
  },
  {
    value: HOME_SETTINGS_OPTIONS.electricCars,
    label: 'Electric Car',
  },
];

export const homePageSectionNameEnum = z.enum([
  HOME_SETTINGS_OPTIONS.mostSearched,
  HOME_SETTINGS_OPTIONS.latestCars,
  HOME_SETTINGS_OPTIONS.popularCars,
  HOME_SETTINGS_OPTIONS.electricCars,
  HOME_SETTINGS_OPTIONS.services,
]);