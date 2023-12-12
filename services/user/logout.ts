import { userActions } from '@/store';

export async function logout() {
  userActions.setUser(null);

  const res = await fetch('/api/logout');
  console.log('s', await res.json());
}
