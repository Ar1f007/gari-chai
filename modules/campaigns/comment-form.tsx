'use client';

import { RHFInput } from '@/components/form/RHFInput';
import { CarCampaignCommentInputs, carCampaignCommentSchema } from '@/schema/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { FormProvider, useForm } from 'react-hook-form';

export const CampaignCommentForm = () => {
  const form = useForm<CarCampaignCommentInputs>({
    resolver: zodResolver(carCampaignCommentSchema),
  });

  async function onSubmit(data: CarCampaignCommentInputs) {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <form
        className='space-y-3'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <RHFInput
          label='Add Your Offer Amount'
          name='amount'
          isRequired
          inputMode='numeric'
          classNames={{
            label: 'font-semibold text-lg',
            errorMessage: 'text-md',
          }}
          size='lg'
          placeholder='eg: 350000'
          autoFocus
        />

        <Button
          color='primary'
          variant='solid'
          className='w-full text-lg font-medium tracking-wider text-default-50 shadow-sm'
          size='lg'
          type='submit'
        >
          Submit Offer
        </Button>
      </form>
    </FormProvider>
  );
};
