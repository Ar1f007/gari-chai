'use client';

import { RHFInput } from '@/components/form/RHFInput';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ChangePassword = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const form = useForm();

  return (
    <div>
      {!showChangePasswordForm && (
        <Button
          onClick={() => setShowChangePasswordForm(true)}
          className='font-medium'
          variant='flat'
          color='primary'
          size='lg'
        >
          Change Password
        </Button>
      )}

      {showChangePasswordForm && (
        <div className='my-5 w-full flex-1 space-y-5 rounded-lg'>
          <h2 className='font-medium'>Change Password</h2>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              className='max-w-sm space-y-5'
            >
              <RHFInput
                name='password'
                label='Old Password'
                autoComplete='current-password'
              />

              <RHFInput
                name='password'
                label='New Password'
                autoComplete='new-password'
              />

              <div className='flex flex-wrap gap-2'>
                <Button
                  type='submit'
                  className='font-medium'
                  variant='flat'
                  color='primary'
                >
                  Update
                </Button>

                <Button
                  onClick={() => setShowChangePasswordForm(false)}
                  className='font-medium'
                  variant='light'
                  color='danger'
                >
                  Cancel
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  );
};
export default ChangePassword;
