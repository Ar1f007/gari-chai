'use client';

import { auth } from '@/services/user';
import { userActions } from '@/store';
import { useEffect } from 'react';

const SetStoreValue = () => {
  async function getUser() {
    const res = await auth.me();
    userActions.setUser(res);
  }

  useEffect(() => {
    getUser();
  }, []);

  return null;
};
export default SetStoreValue;
