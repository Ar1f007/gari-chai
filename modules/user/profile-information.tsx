'use client';

import { RHFInput } from '@/components/form/RHFInput';
import { RHFTextarea } from '@/components/form/RHFTextarea';
import SectionTitle from '@/components/section-title';
import { routes } from '@/config/routes';
import { invalidatePath } from '@/lib/actions';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import extendedDayjs from '@/lib/dayjs';
import { TUserProfileSchema, userProfileFormSchema } from '@/schema/user';
import { auth } from '@/services/user';
import { userActions, userStore } from '@/store';
import { mapValidationErrors } from '@/util/mapValidationError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSnapshot } from 'valtio';

const ProfileInformation = () => {
  const userSnap = useSnapshot(userStore);

  const form = useForm<TUserProfileSchema>({
    values: {
      firstName: userSnap.user?.firstName || '',
      lastName: userSnap.user?.lastName || '',
      address: userSnap.user?.address || '',
      additionalInfo: {
        email: userSnap.user?.additionalInfo?.email || '',
        phone: userSnap.user?.additionalInfo?.phone || '',
      },
    },
    resolver: zodResolver(userProfileFormSchema),
  });

  async function updateProfileInfo(data: TUserProfileSchema) {
    try {
      const res = await auth.updateProfileInfo(data);

      if (!res) throw new Error();

      if (res.status === 'success') {
        userActions.setUser(res.data);
        toast('Profile info updated');

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
    <section>
      <SectionTitle>Profile Information</SectionTitle>

      <h3 className='my-3 font-medium text-foreground-500'>
        Joined on {extendedDayjs(userSnap.user?.createdAt).format('MMM MM, YYYY')}
      </h3>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(updateProfileInfo)}
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
              name='additionalInfo.phone'
              autoComplete='tel'
            />
            <RHFInput
              label='Email'
              name='additionalInfo.email'
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
            type='submit'
            isLoading={form.formState.isSubmitting}
          >
            Save Changes
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
export default ProfileInformation;
