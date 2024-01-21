'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { useSnapshot } from 'valtio';
import { userActions, userStore } from '@/store';
import { auth } from '@/services/user';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

const UserDropdown = () => {
  const router = useRouter();
  const { user } = useSnapshot(userStore);

  if (!user) return null;

  async function handleLogout() {
    userActions.setUser(null);
    auth.logout();
    router.push(routes.home);
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
          <p className='font-semibold'>
            {user.firstName} {user.lastName}
          </p>
        </DropdownItem>

        <DropdownItem key='settings'>My Settings</DropdownItem>

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
