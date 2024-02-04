import { TAuthBasicUserInfo, TChangePasswordSchema, TUserProfileSchema } from '@/schema/user';
import { endpoints } from '../endpoints';
import { apiFetch } from '../apiFetch';
import { ReqMethod } from '../serviceHelper';

export async function updateProfileInfo(params: TUserProfileSchema) {
  const url = endpoints.api.users.updateBasicInfo;

  return apiFetch<TAuthBasicUserInfo>(url, {
    method: ReqMethod.PUT,
    body: params,
  });
}

export async function updatePassword(params: TChangePasswordSchema) {
  const url = endpoints.api.users.updatePassword;

  return apiFetch<TAuthBasicUserInfo>(url, {
    method: ReqMethod.PATCH,
    body: params,
  });
}
