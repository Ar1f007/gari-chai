'use client';

import { settingsActions, userStore } from '@/store';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { routes } from '@/config/routes';
import { auth } from '@/services/user';
import { Avatar } from '@nextui-org/avatar';
import { useRouter } from 'next/navigation';

export const MobileAuthButton = () => {
  const userSnap = useSnapshot(userStore);
  const router = useRouter();

  if (userSnap.user) {
    return (
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-1.5'>
            <div className='flex items-center gap-3'>
              <Avatar
                src={userSnap.user.profilePicture}
                alt={userSnap.user.firstName}
              />
              <h4 className='text-lg'>
                Signed in as&nbsp;
                <span className='font-semibold'>
                  {userSnap.user.firstName} {userSnap.user.lastName}
                </span>
              </h4>
            </div>
          </div>

          <Link
            href={routes.profileSettings}
            className='text-lg'
          >
            Settings
          </Link>
        </div>
        <button
          onClick={() => {
            auth.logout();
            settingsActions.toggleMenuState(false);
          }}
          className='self-start bg-transparent text-xl text-danger'
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-1'>
      <Link
        href={routes.login}
        className='text-lg'
      >
        Login
      </Link>{' '}
      /
      <Link
        href={routes.register}
        className='text-lg'
      >
        Register
      </Link>
    </div>
  );
};
