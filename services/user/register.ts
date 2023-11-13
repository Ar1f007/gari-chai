import { RegisterInputs } from '@/schema/register';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';

export async function registerUser(payload: RegisterInputs) {
  try {
    return apiFetch(endpoints.api.users.baseUrl, {
      method: ReqMethod.POST,
      body: payload,
    });
  } catch (error) {
    return null;
  }
}
