import { AUTH_TOKEN_NAME } from '@/lib/constants';
import { userActions } from '@/store';

export async function logout() {
  userActions.setUser(null);

  const res = await fetch('/api/remove-cookie', {
    method: 'POST',
    body: JSON.stringify({ tokenName: AUTH_TOKEN_NAME }),
  });
  console.log('s', await res.json());
}
