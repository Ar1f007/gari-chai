import {
  AuthenticationMethods,
  SignupWithEmailSchema,
  SignupWithPhoneSchema,
} from '@/schema/register';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { TAuthBasicUserInfo } from '@/schema/user';

type RegisterUserParams = {
  signupMethod: AuthenticationMethods;
  payload: SignupWithEmailSchema | SignupWithPhoneSchema;
};

export async function registerUser(params: RegisterUserParams) {
  const url = endpoints.api.users.signup + '/' + params.signupMethod;

  return apiFetch<TAuthBasicUserInfo>(url, {
    method: ReqMethod.POST,
    body: params.payload,
  });
}
