'use client';

import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { ChevronDownIcon } from 'lucide-react';
import { Fragment, useState } from 'react';

const DeactivateOrDeleteAccount = () => {
  const [showModal, setShowModal] = useState<{ type: 'deactivate' | 'delete' | null }>({
    type: null,
  });

  const modalTitle = showModal.type === 'deactivate' ? 'Deactivate Account' : 'Delete Account';

  return (
    <Fragment>
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
    </Fragment>
  );
};
export default DeactivateOrDeleteAccount;
