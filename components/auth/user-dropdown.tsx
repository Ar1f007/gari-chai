'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { useSnapshot } from 'valtio';
import { userActions, userStore } from '@/store';
import { auth } from '@/services/user';

const UserDropdown = () => {
  const { user } = useSnapshot(userStore);

  if (!user) return null;

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          src={user.image ?? `https://eu.ui-avatars.com/api/?name=${user.name}&size=150`}
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
          <p className='font-semibold'>{user.emails?.length ? user.emails?.[0] : user.name}</p>
        </DropdownItem>

        <DropdownItem key='settings'>My Settings</DropdownItem>

        <DropdownItem
          key='logout'
          color='danger'
          onPress={auth.logout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default UserDropdown;
