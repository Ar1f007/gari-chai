import { API_BASE_URL, API_V1_URL } from '@/lib/constants';

export const endpoints = {
  nextAPI: {
    logout: '/api/logout',
    removeCookie: '/api/remove-cookie',
  },
  api: {
    baseUrl: API_BASE_URL,
    v1URL: API_V1_URL,
    homeSettings: {
      baseUrl: '/home-settings',
    },
    brand: {
      baseUrl: '/brands',
      allAndPopularBrands: '/brands/all-with-popular',
    },
    models: {
      baseUrl: '/models',
    },
    cars: {
      newCarBaseUrl: '/cars',
      usedCarBaseUrl: '/used-cars',
      info: {
        bodyTypes: '/car-body-types',
      },
    },
    users: {
      baseUrl: '/users',
      login: '/users/login',
      sendOTP: '/users/send-otp',
      verifyOTP: '/users/verify-otp',
      me: '/users/me',
    },
    reviews: {
      baseUrl: '/reviews',
    },

    comments: {
      baseUrl: '/comments',
    },
    search: {
      baseUrl: '/search',
    },
  },
  admin: {},
};
