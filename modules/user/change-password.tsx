'use client';

import { RHFInput } from '@/components/form/RHFInput';
import PasswordInput from '@/components/form/password-input';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { TChangePasswordSchema, changePasswordSchema } from '@/schema/user';
import { auth } from '@/services/user';
import { userActions } from '@/store';
import { mapValidationErrors } from '@/util/mapValidationError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ChangePassword = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const form = useForm<TChangePasswordSchema>({
    mode: 'onTouched',
    resolver: zodResolver(changePasswordSchema),
  });

  async function handleChangePassword(data: TChangePasswordSchema) {
    try {
      const res = await auth.updatePassword(data);

      if (res.status === 'success') {
        userActions.setUser(res.data);
        toast('Password changed successfully');
        return;
      }

      if (res.status === 'validationError') {
        mapValidationErrors(res.errors, form);
        return;
      }

      throw new Error(res.message);
    } catch (error) {
      const msg = error instanceof Error ? error.message : GENERIC_ERROR_MSG;
      toast.error(msg);
    }
  }

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
              onSubmit={form.handleSubmit(handleChangePassword)}
              className='max-w-sm space-y-5'
            >
              <PasswordInput
                name='oldPassword'
                label='Old Password'
                autoComplete='current-password'
              />

              <PasswordInput
                name='newPassword'
                label='New Password'
                autoComplete='new-password'
              />

              <div className='flex flex-wrap gap-2'>
                <Button
                  type='submit'
                  className='font-medium'
                  variant='flat'
                  color='primary'
                  isLoading={form.formState.isSubmitting}
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
