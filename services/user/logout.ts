import { AUTH_TOKEN_NAME } from '@/lib/constants';
import { userActions } from '@/store';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';

export async function logout() {
  userActions.setUser(null);

  apiFetch(endpoints.api.users.logout, {
    method: ReqMethod.POST,
    body: { cookieName: AUTH_TOKEN_NAME },
  });
}
