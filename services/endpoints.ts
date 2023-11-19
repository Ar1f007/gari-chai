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
    },
    cars: {
      newCarBaseUrl: '/cars',
      usedCarBaseUrl: '/used-cars',
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
  },
  admin: {},
};
