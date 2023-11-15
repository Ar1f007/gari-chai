'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFInput } from '@/components/form/RHFInput';
import { RHFTextarea } from '@/components/form/RHFTextarea';
import { useState } from 'react';
import { ReviewFormInputs, reviewSchema } from '@/schema/review';
import { zodResolver } from '@hookform/resolvers/zod';

const WriteReview = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const formHandler = useForm<ReviewFormInputs>({
    criteriaMode: 'firstError',
    mode: 'onTouched',
    resolver: zodResolver(reviewSchema),
  });

  async function onSubmit(data: ReviewFormInputs) {
    console.log(data);
  }

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
                  onPress={() => setShowReviewModal(false)}
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
