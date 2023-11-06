import { API_BASE_URL, API_V1_URL } from '@/lib/constants';

export const endpoints = {
  api: {
    baseUrl: API_BASE_URL,
    v1URL: API_V1_URL,
    homeSettings: {
      baseUrl: '/home-settings',
    },
    brand: {
      baseUrl: '/brands',
    },
    cars: {
      newCarBaseUrl: '/cars',
      usedCarBaseUrl: '/used-cars',
      getReviews: '/reviews',
    },
  },
  admin: {},
};
