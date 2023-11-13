'use client';

import UserDropdown from '@/components/auth/user-dropdown';
import Icon from '@/components/icon';
import { routes } from '@/config/routes';
import { userStore } from '@/store';
import Link from 'next/link';
import { useSnapshot } from 'valtio';

const AuthButton = () => {
  const userSnap = useSnapshot(userStore);

  if (userSnap.status === 'pending') return null;

  return (
    <>
      {userSnap.user ? (
        <UserDropdown />
      ) : (
        <>
          <Icon
            name='user-2'
            className='-mt-1 mr-1'
          />

          <Link href={routes.login}>Login</Link>
          <span>&nbsp;/&nbsp;</span>
          <Link href={routes.register}>Register</Link>
        </>
      )}
    </>
  );
};
export default AuthButton;
