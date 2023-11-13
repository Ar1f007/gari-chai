import { userActions } from '@/store';

export async function logout() {
  userActions.setUser(null);

  fetch('/api/logout');
}
