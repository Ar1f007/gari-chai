import { logout } from './logout';
import { profile } from './me';
import { registerUser } from './register';
import { verifyOTP } from './verifyOTP';
import { login } from './login';

export const auth = {
  me: profile,
  registerUser,
  verifyOTP,
  logout,
  login,
};
