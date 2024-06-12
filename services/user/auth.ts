import { TAuthBasicUserInfo } from '@/schema/user';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';

export const auth = {
  // login: async function (payload: LoginInputs) {
  //   try {
  //     return apiFetch<TAuthBasicUserInfo>(endpoints.api.users.login, {
  //       method: ReqMethod.POST,
  //       body: payload,
  //     });
  //   } catch (error) {
  //     return null;
  //   }
  // },

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
