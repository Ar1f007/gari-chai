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
      signup: '/users/signup',
      login: '/users/login',
      logout: '/users/logout',
      sendOTP: '/users/send-otp',
      verifyOTP: '/users/verify-otp',
      profile: '/users/profile',
      updateBasicInfo: '/users/update-basic-info',
      updatePassword: '/users/update-password',
      deactivateAccount: '/users/deactivate-account',
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
    sliders: {
      baseUrl: '/sliders',
    },
  },
  admin: {},
};
