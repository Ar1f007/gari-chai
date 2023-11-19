import { z } from 'zod';

export const MAX_FILE_SIZE_LIMIT = 300000; // 300 kb
export const PLACEHOLDER_IMAGE = '/images/placeholder.webp';
export const CURRENCY_SYMBOL = '৳';
export const GENERIC_ERROR_MSG = 'Something went wrong';
export const AUTH_TOKEN_NAME = 'X_GARI_CHAI_TOKEN';

export const IS_CLIENT = typeof window !== 'undefined';

export const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://gari-chai.onrender.com';

export const API_V1_URL = API_BASE_URL + '/api/v1';

export const PRIMARY_COLOR_500 = '#1e8667';

export const SearchParams = {
  getAllBrands: 'get=all',
};

// Home settings keys

export const HOME_SETTINGS_OPTIONS = {
  latestCars: 'latest-cars',
  popularCars: 'popular-cars',
  electricCars: 'electric-cars',
  services: 'services',
  mostSearchedCars: 'most-searched-cars',
  popularBrands: 'popular-brands',
  upcomingCars: 'upcoming-cars',
};

export const homePageSectionNameEnum = z.enum([
  HOME_SETTINGS_OPTIONS.mostSearchedCars,
  HOME_SETTINGS_OPTIONS.latestCars,
  HOME_SETTINGS_OPTIONS.popularCars,
  HOME_SETTINGS_OPTIONS.upcomingCars,
  HOME_SETTINGS_OPTIONS.electricCars,
  HOME_SETTINGS_OPTIONS.services,
  HOME_SETTINGS_OPTIONS.popularBrands,
]);
