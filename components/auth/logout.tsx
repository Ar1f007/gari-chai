'use client';

// import { signOut } from 'next-auth/react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
// import { Session } from 'next-auth';

const Logout = ({ session }: { session: any }) => {
  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          src={
            session.user?.image ??
            'https://eu.ui-avatars.com/api/?name=${session.user?.name}&size=150'
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
          <p className='font-semibold'>{session.user?.email}</p>
        </DropdownItem>

        <DropdownItem key='settings'>My Settings</DropdownItem>

        <DropdownItem
          key='logout'
          color='danger'
          onPress={() => {}}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default Logout;
