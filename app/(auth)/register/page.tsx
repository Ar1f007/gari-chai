'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Tab, Tabs } from '@nextui-org/tabs';
import { Button } from '@nextui-org/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';

import { RHFInput } from '@/components/form/RHFInput';
import { routes } from '@/config/routes';
import { TApiData, TApiError } from '@/types';
import { TAuthBasicUserInfo } from '@/schema/user';
import { userActions } from '@/store';
import { mapValidationErrors } from '@/util/mapValidationError';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import {
  AuthenticationMethods,
  signupWithEmailSchema,
  signupWithPhoneSchema,
} from '@/schema/register';
import { registerUser } from '@/services/user/register';
import Link from 'next/link';
import { createUrl } from '@/lib/utils';

const RegisterPage = () => {
  const [signupMethod, setSignupMethod] = React.useState<AuthenticationMethods>('email');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const params = useSearchParams();

  const schema = signupMethod === 'email' ? signupWithEmailSchema : signupWithPhoneSchema;

  const form = useForm<z.infer<typeof schema>>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
  });

  function redirectPath() {
    const searchParams = new URLSearchParams(params);
    const redirectPath = searchParams.get('pathname');

    searchParams.delete('pathname');

    if (redirectPath) {
      const url = createUrl(decodeURIComponent(redirectPath), searchParams);

      return url;
    }

    return routes.home;
  }

  async function handleSignupResponse(res: TApiError | TApiData<TAuthBasicUserInfo>) {
    if (res.status === 'success') {
      toast.success('Account created successfully');

      userActions.setUser(res.data);

      router.push(redirectPath());
      return;
    }

    if (res.status === 'validationError') {
      mapValidationErrors(res.errors, form);
      return;
    }

    // status is either error or fail, so display the message
    toast.error(res.message || GENERIC_ERROR_MSG);
    return;
  }

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const res = await registerUser({
        signupMethod,
        payload: data,
      });

      handleSignupResponse(res);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : 'Something went wrong, please try again later';

      toast.error(errMsg);
    }
  }

  const firstNameAndLastNameFields = (
    <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-2'>
      <RHFInput
        label='First Name'
        name='firstName'
        autoComplete='name'
        // placeholder='Enter your first name'
        isRequired
        spellCheck={false}
      />

      <RHFInput
        label='Last Name'
        name='lastName'
        autoComplete='name'
        // placeholder='Enter your last name'
        isRequired
        spellCheck={false}
      />
    </div>
  );

  const passwordAndSubmitBtn = (
    <React.Fragment>
      <RHFInput
        label='Password'
        name='password'
        isRequired
        // placeholder='Enter your password'
        autoComplete='new-password'
        description='8+ characters with uppercase, lowercase, digit, and special character'
        type={showPassword ? 'text' : 'password'}
        endContent={
          <i
            onClick={() => setShowPassword(!showPassword)}
            className='flex-shrink-0 cursor-pointer text-2xl text-default-400'
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </i>
        }
      />

      <div className='flex justify-end gap-2'>
        <Button
          variant='faded'
          fullWidth
          className='py-6 text-large font-semibold'
          color='primary'
          type='submit'
          isLoading={form.formState.isSubmitting}
        >
          Create Account
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <div className='space-y-2'>
      <Tabs
        fullWidth
        size='md'
        aria-label='Tabs form'
        selectedKey={signupMethod}
        onSelectionChange={(v) => setSignupMethod(v as 'email' | 'phone')}
      >
        <Tab
          key='email'
          title='Email'
        >
          <FormProvider {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {firstNameAndLastNameFields}
              <RHFInput
                label='Email'
                name='email'
                autoComplete='email'
                // placeholder='Enter your email'
                type='email'
                isRequired
              />
              {passwordAndSubmitBtn}
            </form>
          </FormProvider>
        </Tab>

        <Tab
          key='phone'
          title='Phone'
        >
          <FormProvider {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {firstNameAndLastNameFields}
              <RHFInput
                label='Phone Number'
                name='phone'
                autoComplete='tel'
                // placeholder='Enter your phone number'
                type='tel'
                isRequired
              />
              {passwordAndSubmitBtn}
            </form>
          </FormProvider>
        </Tab>
      </Tabs>

      <p className='text-center text-sm font-semibold'>
        <span className='text-default-500'>Already have an account? </span>
        <Link
          href={routes.login}
          className='uppercase text-primary'
        >
          Login
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;
