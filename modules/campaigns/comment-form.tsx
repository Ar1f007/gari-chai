'use client';

import { RHFTextEditor } from '@/components/form/RHFTextEditor';
import { Button } from '@nextui-org/button';
import { FormProvider, useForm } from 'react-hook-form';

export const CampaignCommentForm = () => {
  const form = useForm({
    defaultValues: {
      content: '',
    },
  });

  return (
    <div>
      <FormProvider {...form}>
        <form className='space-y-5'>
          <div className='rounded-md shadow-sm'>
            <RHFTextEditor
              name='content'
              placeholder='your offer amount...'
            />
          </div>

          <Button
            color='primary'
            variant='solid'
            className='text-default-50 shadow-sm'
          >
            Make Offer
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
