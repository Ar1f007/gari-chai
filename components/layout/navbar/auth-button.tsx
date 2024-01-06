'use client';

import UserDropdown from '@/components/auth/user-dropdown';
import Icon from '@/components/icon';
import { routes } from '@/config/routes';
import { userStore } from '@/store';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useSnapshot } from 'valtio';

type AuthButtonProps = {
  showOnlySignUpBtn?: boolean;
};

const AuthButton = ({ showOnlySignUpBtn }: AuthButtonProps) => {
  const userSnap = useSnapshot(userStore);

  if (userSnap.status === 'pending') return null;

  return (
    <>
      {userSnap.user ? (
        <UserDropdown />
      ) : (
        <>
          {showOnlySignUpBtn ? (
            <>
              <Button
                as={Link}
                color='primary'
                href={routes.login}
                variant='flat'
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Icon
                name='user-round'
                className='-mt-1 mr-1 hidden lg:inline-block'
              />

              <Link href={routes.login}>Login</Link>
              <span>&nbsp;/&nbsp;</span>
              <Link href={routes.register}>Register</Link>
            </>
          )}
        </>
      )}
    </>
  );
};
export default AuthButton;
