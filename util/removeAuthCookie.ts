import { AUTH_TOKEN_NAME } from '@/lib/constants';
import { ReqMethod, endpoints } from '@/services';

export async function removeAuthCookie(token: string) {
  fetch(endpoints.nextAPI.removeCookie, {
    method: ReqMethod.POST,
    body: JSON.stringify({ tokenName: AUTH_TOKEN_NAME }),
  });
}
