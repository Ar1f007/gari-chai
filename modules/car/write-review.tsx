'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFInput } from '@/components/form/RHFInput';
import { RHFTextarea } from '@/components/form/RHFTextarea';
import { useEffect, useState } from 'react';
import { ReviewFormInputs, reviewSchema } from '@/schema/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviews } from '@/services/reviews';
import { toast } from 'sonner';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { mapValidationErrors } from '@/util/mapValidationError';
import { ZodError } from 'zod';
import { TCarSchema } from '@/schema/car';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { createUrl } from '@/lib/utils';

const WriteReview = ({ carId }: { carId: TCarSchema['_id'] }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const userSnap = useSnapshot(userStore);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const formHandler = useForm<ReviewFormInputs>({
    criteriaMode: 'firstError',
    mode: 'onTouched',
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: decodeURIComponent(searchParams.get('title') || ''),
      review: decodeURIComponent(searchParams.get('review') || ''),
      rating: decodeURIComponent(searchParams.get('rating') || ''),
    },
  });

  function handleUnauthenticatedUser() {
    const params = new URLSearchParams();

    params.set('pathname', pathname);
    params.set('showReviewModal', 'true');
    params.set('title', formHandler.getValues('title'));
    params.set('review', formHandler.getValues('review'));
    params.set('rating', formHandler.getValues('rating'));

    const url = encodeURI(createUrl(routes.login, params));

    http: toast.error('Please login to continue', {
      action: {
        label: 'Go to Login',
        onClick: () => router.push(url),
      },
    });
  }

  async function onSubmit(data: ReviewFormInputs) {
    if (!userSnap.user) {
      handleUnauthenticatedUser();
      return;
    }

    const res = await reviews.addReview({
      ...data,
      carId,
      userId: userSnap.user._id,
    });

    if (!res) {
      toast.error(GENERIC_ERROR_MSG);
      return;
    }

    if (res instanceof ZodError) {
      toast.error('Invalid input given for: ' + res.errors.map((e) => e.path.toString()));
      return;
    }

    if (res.status === 'success') {
      toast.success('Your review will be added shortly.');
      formHandler.reset();
      setShowReviewModal(false);

      return;
    }

    if (res.status === 'validationError') {
      mapValidationErrors(res.errors, formHandler);
      toast.error(res.message ?? 'Invalid Inputs');
      return;
    }

    toast.error(res.message ?? GENERIC_ERROR_MSG);
  }

  function handleCancel() {
    setShowReviewModal(false);
    formHandler.reset();
  }

  useEffect(() => {
    const showReviewModal = searchParams.get('showReviewModal');

    if (showReviewModal && showReviewModal === 'true') {
      setShowReviewModal(true);
    }
  }, [searchParams]);

  return (
    <>
      <Button
        variant='bordered'
        color='primary'
        onPress={() => setShowReviewModal(true)}
      >
        Write a Review
      </Button>

      <Modal
        isOpen={showReviewModal}
        hideCloseButton
      >
        <ModalContent>
          <FormProvider {...formHandler}>
            <form onSubmit={formHandler.handleSubmit(onSubmit)}>
              <ModalHeader className='flex flex-col gap-1'>Write your review</ModalHeader>
              <ModalBody>
                <RHFInput
                  name='title'
                  label='Add a heading'
                />

                <RHFTextarea
                  name='review'
                  label='What did you like or dislike?'
                />

                <RHFInput
                  name='rating'
                  label='Rating (1-5)'
                  type='number'
                  min={1}
                  max={5}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type='submit'
                  isLoading={formHandler.formState.isSubmitting}
                  variant='bordered'
                  color='primary'
                >
                  Submit Review
                </Button>
                <Button
                  onPress={handleCancel}
                  variant='light'
                >
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WriteReview;
