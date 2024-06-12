import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';

export async function deleteAccount() {
  return apiFetch(endpoints.api.users.baseUrl, {
    method: ReqMethod.DELETE,
  });
}

export async function deactivateAccount() {
  return apiFetch(endpoints.api.users.deactivateAccount, {
    method: ReqMethod.PATCH,
  });
}
