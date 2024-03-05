'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { useSnapshot } from 'valtio';
import { userActions, userStore } from '@/store';
import { auth } from '@/services/user';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { toast } from 'sonner';
import { GENERIC_ERROR_MSG } from '@/lib/constants';

const UserDropdown = () => {
  const router = useRouter();
  const { user } = useSnapshot(userStore);

  if (!user) return null;

  async function handleLogout() {
    const user = userStore.user;

    try {
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

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          src={
            user.profilePicture ?? `https://eu.ui-avatars.com/api/?name=${user.firstName}&size=150`
          }
        />
      </DropdownTrigger>

      <DropdownMenu
        aria-label='Profile Actions'
        variant='flat'
      >
        <DropdownItem
          key='profile'
          className='h-14 gap-2'
        >
          <p className='font-semibold'>Signed in as</p>
          <p className='font-semibold capitalize'>
            {user.firstName} {user.lastName}
          </p>
        </DropdownItem>

        <DropdownItem
          key='settings'
          onPress={() => router.push(routes.profileSettings)}
        >
          My Settings
        </DropdownItem>

        <DropdownItem
          key='reviews'
          onPress={() => router.push(routes.userReviews)}
        >
          Reviews
        </DropdownItem>

        <DropdownItem
          key='wishlist'
          onPress={() => router.push(routes.userWishlist)}
        >
          Wishlist
        </DropdownItem>

        <DropdownItem
          key='logout'
          color='danger'
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default UserDropdown;
