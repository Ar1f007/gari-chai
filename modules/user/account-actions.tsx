'use client';

import { routes } from '@/config/routes';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { auth } from '@/services/user';
import { userActions } from '@/store';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { ChevronDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

const DeactivateOrDeleteAccount = () => {
  const [showModal, setShowModal] = useState<{ type: 'deactivate' | 'delete' | null }>({
    type: null,
  });

  const router = useRouter();

  async function handleDeleteAccount() {
    try {
      const res = await auth.deleteAccount();

      if (res.status === 'success') {
        toast.success('Account deleted successfully');
        userActions.setUser(null);

        router.replace(routes.home);

        return;
      }

      toast.error(res.message);
    } catch (error) {
      toast.error(GENERIC_ERROR_MSG);
    } finally {
      setShowModal({ type: null });
    }
  }
  async function handleDeactivateAccount() {
    try {
      const res = await auth.deactivateAccount();

      if (res.status === 'success') {
        toast.success('Account deactivated successfully');
        userActions.setUser(null);

        router.replace(routes.home);

        return;
      }

      toast.error(res.message);
    } catch (error) {
      toast.error(GENERIC_ERROR_MSG);
    } finally {
      setShowModal({ type: null });
    }
  }

  const modalContent = {
    title: showModal.type === 'deactivate' ? 'Deactivate Account' : 'Delete Account',
    headingText:
      showModal.type === 'deactivate'
        ? 'Are you sure you want to deactivate your account?'
        : 'Are you sure you want to delete your account?',
    subText:
      showModal.type === 'deactivate'
        ? 'You can reactivate it at any time by simply signing in again.'
        : 'Deleting the account will permanently remove all of your data. This action cannot be undone.',
    confirmBtnText: showModal.type === 'deactivate' ? 'Deactivate' : 'Delete',
    cancelBtnText: 'Cancel',
    onConfirm: showModal.type === 'deactivate' ? handleDeactivateAccount : handleDeleteAccount,
  };

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
            onPress={() => setShowModal({ type: 'deactivate' })}
          >
            Deactivate Account
          </DropdownItem>
          <DropdownItem
            key='delete'
            className='text-danger'
            color='danger'
            description='Permanently delete the account'
            onPress={() => setShowModal({ type: 'delete' })}
          >
            Delete Account
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={!!showModal.type}
        onOpenChange={() => setShowModal({ type: null })}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className='flex flex-col gap-1'>{modalContent.title}</ModalHeader>
              <ModalBody>
                <h2 className='text-pretty font-medium'>{modalContent.headingText}</h2>

                <p className='text-md'>{modalContent.subText}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={onClose}
                >
                  {modalContent.cancelBtnText}
                </Button>
                <Button
                  variant='flat'
                  color='primary'
                  onPress={modalContent.onConfirm}
                >
                  {modalContent.confirmBtnText}
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
export default DeactivateOrDeleteAccount;
