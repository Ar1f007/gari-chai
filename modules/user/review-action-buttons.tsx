'use client';

import { ReviewBody } from '@/schema/review';
import { useState, Fragment, useTransition } from 'react';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Trash2Icon } from 'lucide-react';
import { reviewsService } from '@/services/reviews';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { userStore } from '@/store';

type ReviewActionButtonsProps = {
  review: ReviewBody;
  refetch: (userId: string) => {};
};

const ReviewActionButtons = ({ review, refetch }: ReviewActionButtonsProps) => {
  const [pending, startTransition] = useTransition();

  const router = useRouter();

  const [showModal, setShowModal] = useState<{ type: 'edit' | 'delete' | null }>({
    type: null,
  });

  const modalContent = {
    title: showModal.type == 'edit' ? 'Edit Review' : 'Delete Review',
    headingText: showModal.type == 'delete' ? 'Are you sure you want to delete this review?' : null,
    subText: showModal.type === 'delete' ? 'This action can not be undone.' : null,
    confirmBtnText: showModal.type === 'edit' ? 'Update' : 'Delete',
    cancelBtnText: 'Cancel',
    onConfirm: showModal.type === 'edit' ? () => {} : handleDeleteReview,
  };

  async function handleDeleteReview() {
    try {
      const res = await reviewsService.deleteReview({ reviewId: review._id });

      if (res.status == 'success') {
        toast.success('Review Deleted Successfully');
        refetch(userStore.user?._id!); // at the moment we know user id is there

        setShowModal({ type: null });

        return;
      }

      toast.error(res.message || GENERIC_ERROR_MSG);
    } catch (error) {
      toast.error(GENERIC_ERROR_MSG);
    }
  }

  return (
    <div>
      <Button
        isIconOnly
        color='danger'
        aria-label='Delete'
        variant='light'
        onPress={() => setShowModal({ type: 'delete' })}
        size='sm'
      >
        <Trash2Icon />
      </Button>

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
                  isDisabled={pending}
                >
                  {modalContent.cancelBtnText}
                </Button>

                <Button
                  variant='flat'
                  color='primary'
                  onPress={() => startTransition(() => modalContent.onConfirm())}
                  isDisabled={pending}
                >
                  {modalContent.confirmBtnText}
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ReviewActionButtons;
