'use client';

import { auth } from '@/services/user';
import { userActions } from '@/store';
import { useEffect } from 'react';

const SetStoreValue = () => {
  const controller = new AbortController();

  async function getUser() {
    const res = await auth.me({
      options: {
        signal: controller.signal,
      },
    });
    userActions.setUser(res);
  }

  useEffect(() => {
    getUser();
  }, []);

  return null;
};
export default SetStoreValue;
