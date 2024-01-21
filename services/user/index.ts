import { logout } from './logout';
import { profile } from './me';
import { registerUser } from './register';
import { verifyOTP } from './verifyOTP';

export const auth = {
  me: profile,
  registerUser,
  verifyOTP,
  logout,
};
