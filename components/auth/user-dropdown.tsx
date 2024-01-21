'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store';
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
          onPress={auth.logout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default UserDropdown;
