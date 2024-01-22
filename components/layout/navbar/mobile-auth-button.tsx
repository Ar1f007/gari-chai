'use client';

import { settingsActions, userActions, userStore } from '@/store';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { routes } from '@/config/routes';
import { auth } from '@/services/user';
import { Avatar } from '@nextui-org/avatar';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GENERIC_ERROR_MSG } from '@/lib/constants';

export const MobileAuthButton = () => {
  const router = useRouter();
  const userSnap = useSnapshot(userStore);

  async function handleLogout() {
    const user = userStore.user;

    try {
      settingsActions.toggleMenuState(false);
      userActions.setUser(null);

      const res = await auth.logout();

      if (res.status === 'success') {
        router.replace(routes.home);
        return;
      }

      throw new Error(res.message || 'Something went wrong, could not logout');
    } catch (err) {
      userActions.setUser(user);
      const errorMsg = err instanceof Error ? err.message : GENERIC_ERROR_MSG;
      toast.error(errorMsg);
    }
  }

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
          onClick={handleLogout}
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
