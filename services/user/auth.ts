import { TAuthUser } from '@/schema/user';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { LoginInputs } from '@/schema/login';

export const auth = {
  login: async function (payload: LoginInputs) {
    try {
      return apiFetch<TAuthUser>(endpoints.api.users.login, {
        method: ReqMethod.POST,
        body: payload,
      });
    } catch (error) {
      return null;
    }
  },

  sendOTP: async function (payload: { phoneNumber: string }) {
    try {
      return apiFetch(endpoints.api.users.sendOTP, {
        method: ReqMethod.POST,
        body: payload,
      });
    } catch (error) {
      return null;
    }
  },
};
