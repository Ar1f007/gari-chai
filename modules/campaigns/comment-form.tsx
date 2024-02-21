'use client';

import { RHFInput } from '@/components/form/RHFInput';
import { FormatPrice } from '@/components/format-price';
import { formatRangeToLakhCrore } from '@/lib/utils';
import { CarCampaignCommentInputs, carCampaignCommentSchema } from '@/schema/comment';
import { settingsStore } from '@/store';
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

  if (!settingsStore.currentlySelectedCar) return;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label
          htmlFor='bid'
          className='mb-2 block text-sm font-semibold'
        >
          *You can make an offer between
          <span className='font-bold text-primary'>
            &nbsp; (
            <FormatPrice
              min={settingsStore.currentlySelectedCar.campaignPrice.min}
              max={settingsStore.currentlySelectedCar.campaignPrice.max}
              type='number'
            />
            )
          </span>
        </label>
        <RHFInput
          id='bid'
          name='amount'
          isRequired
          inputMode='numeric'
          classNames={{
            label: 'font-semibold text-lg',
            errorMessage: 'text-md',
            description: 'text-md text-default-700',
          }}
          size='lg'
          placeholder='eg: 350000'
          // autoFocus
        />

        <Button
          color='primary'
          variant='solid'
          className='mt-4 w-full text-lg tracking-wider text-default-50 shadow-sm'
          size='lg'
          type='submit'
        >
          Submit Your Offer
        </Button>
      </form>
    </FormProvider>
  );
};
