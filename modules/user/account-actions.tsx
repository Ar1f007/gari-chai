'use client';

import { Button, ButtonGroup } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const DeactivateOrDeleteAccount = () => {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant='flat'
            color='default'
            size='lg'
            className='font-medium'
          >
            Account Actions <ChevronDownIcon className='mt-1' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant='faded'
          aria-label='Dropdown menu with description'
        >
          <DropdownItem
            key='deactivate-account'
            description='Temporarily deactivate the account'
          >
            Deactivate Account
          </DropdownItem>
          <DropdownItem
            key='delete'
            className='text-danger'
            color='danger'
            description='Permanently delete the account'
          >
            Delete Account
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default DeactivateOrDeleteAccount;
