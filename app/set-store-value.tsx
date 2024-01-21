'use client';

import { auth } from '@/services/user';
import { userActions, userStore } from '@/store';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const SetStoreValue = () => {
  const userSnap = useSnapshot(userStore);

  async function getUser() {
    const res = await auth.me();
    userActions.setUser(res);
  }

  useEffect(() => {
    if (!userSnap.user) {
      getUser();
    }
  }, [userStore.user]);

  return null;
};
export default SetStoreValue;
