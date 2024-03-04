import { logout } from './logout';
import { profile } from './me';
import { registerUser } from './register';
import { verifyOTP } from './verifyOTP';
import { login } from './login';
import { updateProfileInfo, updatePassword } from './update-info';
import { deleteAccount, deactivateAccount } from './delete-deactivate';
import {resetPassword, resetPasswordCode} from "@/services/user/password-reset";

export const auth = {
  deactivateAccount,
  deleteAccount,
  login,
  logout,
  me: profile,
  registerUser,
  updatePassword,
  updateProfileInfo,
  verifyOTP,
  resetPasswordCode,
  resetPassword,
};
