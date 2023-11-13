import { logout } from './logout';
import { me } from './me';
import { registerUser } from './register';
import { verifyOTP } from './verifyOTP';

export const auth = {
  me,
  registerUser,
  verifyOTP,
  logout,
};
