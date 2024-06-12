import { AuthenticationMethods } from '@/schema/register';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { LoginWithEmailSchema, LoginWithPhoneSchema } from '@/schema/login';
import { TAuthBasicUserInfo } from '@/schema/user';

type LoginUserParams = {
  loginMethod: AuthenticationMethods;
  payload: LoginWithEmailSchema | LoginWithPhoneSchema;
};
export async function login(params: LoginUserParams) {
  const url = endpoints.api.users.login + '/' + params.loginMethod;

  return apiFetch<TAuthBasicUserInfo>(url, {
    method: ReqMethod.POST,
    body: params.payload,
  });
}
