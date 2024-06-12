import { apiFetch, endpoints, ReqMethod } from '@/services';
import { ResetPasswordPayload } from '@/schema/user';

type ResetPasswordCodeParams = {
  type: string;
  sendCodeTo: string;
  requestedFrom: string;
};
export async function resetPasswordCode(params: ResetPasswordCodeParams) {
  const url = endpoints.api.users.resetPasswordCode;

  return apiFetch(url, {
    method: ReqMethod.POST,
    body: params,
  });
}

export async function resetPassword(params: ResetPasswordPayload) {
  const url = endpoints.api.users.resetPassword;

  return apiFetch(url, {
    method: ReqMethod.POST,
    body: params,
  });
}
