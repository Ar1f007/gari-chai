import { TAuthBasicUserInfo } from '@/schema/user';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';

type VerifyOTPProps = {
  phoneNumber: string;
  otp: number;
};

export async function verifyOTP(payload: VerifyOTPProps) {
  try {
    return apiFetch<TAuthBasicUserInfo>(endpoints.api.users.verifyOTP, {
      method: ReqMethod.POST,
      body: payload,
    });
  } catch (error) {
    return null;
  }
}
