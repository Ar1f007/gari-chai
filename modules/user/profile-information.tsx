'use client';

import { RHFInput } from '@/components/form/RHFInput';
import { RHFTextarea } from '@/components/form/RHFTextarea';
import SectionTitle from '@/components/section-title';
import { userStore } from '@/store';
import { Button } from '@nextui-org/button';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';

const ProfileInformation = () => {
  const userSnap = useSnapshot(userStore);

  const form = useForm({
    defaultValues: {
      firstName: userSnap.user?.firstName || '',
      lastName: userSnap.user?.lastName || '',
      address: userSnap.user?.address || '',
    },
    values: {
      firstName: userSnap.user?.firstName || '',
      lastName: userSnap.user?.lastName || '',
      address: userSnap.user?.address || '',
    },
  });

  return (
    <section>
      <SectionTitle>Profile Information</SectionTitle>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className='my-5 grid max-w-3xl grid-cols-1 gap-5'
        >
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            <RHFInput
              label='First Name'
              name='firstName'
              autoComplete='username'
            />
            <RHFInput
              label='Last Name'
              name='lastName'
              autoComplete='username'
            />
          </div>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            <RHFInput
              label='Phone'
              name='phone'
              autoComplete='tel'
            />
            <RHFInput
              label='Email'
              name='email'
              autoComplete='email'
            />
          </div>

          <RHFTextarea
            name='address'
            label='Address'
          />

          <Button
            variant='flat'
            color='primary'
            className='w-fit font-medium'
            size='lg'
            isDisabled={!form.formState.isDirty}
          >
            Save Changes
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
export default ProfileInformation;
