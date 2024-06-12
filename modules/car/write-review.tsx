'use client';

// External dependencies
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils';
import { ZodError } from 'zod';

// UI Components
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Select, SelectItem } from '@nextui-org/select';

// Form and Input
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { RHFInput } from '@/components/form/RHFInput';
import { RHFTextarea } from '@/components/form/RHFTextarea';

// Schemas and Validators
import { reviewSchema, ReviewFormInputs } from '@/schema/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { TCarSchema } from '@/schema/car';

// Services and Utilities
import { reviewsService } from '@/services/reviews';
import { toast } from 'sonner';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { mapValidationErrors } from '@/util/mapValidationError';
import { routes } from '@/config/routes';

// Data and others
import { userStore } from '@/store';
import data from '@/data/index.json';
import { RHFRatingInput } from '@/components/form/rhf-rating';

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
      reviewType: decodeURIComponent(searchParams.get('reviewType') || ''),
      title: decodeURIComponent(searchParams.get('title') || ''),
      review: decodeURIComponent(searchParams.get('review') || ''),
      rating: +decodeURIComponent(searchParams.get('rating') || ''),
    },
  });

  function handleUnauthenticatedUser() {
    const params = new URLSearchParams();

    params.set('pathname', pathname);
    params.set('showReviewModal', 'true');
    params.set('reviewType', formHandler.getValues('reviewType'));
    params.set('title', formHandler.getValues('title'));
    params.set('review', formHandler.getValues('review'));
    params.set('rating', formHandler.getValues('rating')?.toString());

    const url = encodeURI(createUrl(routes.login, params));

    toast.error('Please login to continue', {
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

    const res = await reviewsService.addReview({
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
      formHandler.reset();
      setShowReviewModal(false);
      toast.message('Review Submitted', {
        description:
          'Your review has been submitted and is pending approval by our team. Thank you for your contribution!',
      });

      if (searchParams.toString().length) {
        router.replace(pathname);
      }

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
        className='w-fit'
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
                <Controller
                  name='reviewType'
                  render={({ field }) => (
                    <Select
                      label='Type'
                      placeholder='Select an option'
                      disableSelectorIconRotation
                      defaultSelectedKeys={[field.value || '']}
                      {...field}
                      errorMessage={
                        !!formHandler.formState.errors['reviewType'] ? 'Please select a type' : ''
                      }
                      isInvalid={!!formHandler.formState.errors['reviewType']}
                    >
                      {data.reviewTypeOptions.map((review) => (
                        <SelectItem
                          key={review.value}
                          value={review.value}
                        >
                          {review.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <RHFInput
                  name='title'
                  label='Add a heading'
                />

                <RHFTextarea
                  name='review'
                  label='Review'
                />

                <RHFRatingInput
                  name='rating'
                  label='Rating'
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
