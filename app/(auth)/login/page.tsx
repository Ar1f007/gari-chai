'use client';

import Link from 'next/link';
import { InfoIcon, LockIcon, PhoneIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';

import { LoginInputs, loginSchema } from '@/schema/login';
import { routes } from '@/config/routes';
import { RHFInput } from '@/components/form/RHFInput';
import { auth } from '@/services/user/auth';
import { toast } from 'sonner';
import { mapValidationErrors } from '@/util/mapValidationError';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AUTH_TOKEN_NAME, GENERIC_ERROR_MSG } from '@/lib/constants';
import { userActions } from '@/store';
import { removeAuthCookie } from '@/util/removeAuthCookie';
import { parsePhoneNumber } from 'libphonenumber-js';
import dynamic from 'next/dynamic';

const OTPForm = dynamic(() => import('@/components/auth/otp-form'));

const LoginPage = () => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');

  const [loading, setLoading] = useState(false);
  const [showOTPInputForm, setShowOTPInputForm] = useState(false);

  const formHandler = useForm<LoginInputs>({
    criteriaMode: 'firstError',
    mode: 'onTouched',
    defaultValues: {
      password: '',
      phoneNumber: '',
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInputs) {
    const res = await auth.login(data);

    if (!res) {
      toast.error('Something went wrong, please try again later');
      return;
    }

    if (res.status === 'validationError') {
      mapValidationErrors(res.errors, formHandler);
      return;
    }

    if (res.status !== 'success') {
      toast.error(res.message);
      return;
    }

    if (res.data.isVerified) {
      userActions.setUser(res.data);
      router.push(routes.home);
      return;
    }

    // at this point user's account is not verified
    setErrMsg('Account not verified. Click to receive OTP for verification.');

    removeAuthCookie(AUTH_TOKEN_NAME);

    // if (res.status === 'fail' || res.status === 'error') {
    //   toast.error(res.message);
    //   return;
    // }
    // if (res.status === 'success' && res.data) {
    //   setPhoneNumber(data.phoneNumber);
    //   setShowOTPInputForm(true);
    // }
  }

  async function sendOTP() {
    try {
      setLoading(true);

      const res = await auth.sendOTP({
        phoneNumber: parsePhoneNumber(formHandler.getValues('phoneNumber'), 'BD').number,
      });

      if (!res) {
        toast.error('Something went wrong, please try again or after sometime');
        return;
      }

      if (res.status === 'fail' || res.status === 'error') {
        toast.error(res.message ?? GENERIC_ERROR_MSG);

        return;
      }

      if (res.status === 'success') {
        setShowOTPInputForm(true);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(GENERIC_ERROR_MSG);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <FormProvider {...formHandler}>
        {errMsg && (
          <div
            role='alert'
            className='flex items-start gap-2 rounded-lg border-2 border-rose-400 px-4 py-3'
          >
            <InfoIcon className='text-rose-600' />
            <p className='font-medium text-default-600'>
              {errMsg}

              <Button
                onPress={sendOTP}
                size='sm'
                className='ml-2'
                variant='flat'
                color='primary'
                isLoading={loading}
              >
                Send OTP
              </Button>
            </p>
          </div>
        )}
        <form
          className='mt-4 flex flex-col gap-6'
          onSubmit={formHandler.handleSubmit(onSubmit)}
        >
          <RHFInput
            name='phoneNumber'
            required
            autoComplete='tel'
            placeholder='Phone number'
            aria-label='enter the phone number'
            startContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-default-500'>+880</span>
              </div>
            }
            endContent={
              <PhoneIcon className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
            }
          />
          <RHFInput
            name='password'
            type='password'
            required
            autoComplete='current-password'
            placeholder='Password'
            aria-label='enter password'
            endContent={
              <LockIcon className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
            }
          />

          <Button
            variant='faded'
            fullWidth
            className='py-6 text-large font-semibold'
            color='primary'
            type='submit'
            isLoading={formHandler.formState.isSubmitting}
          >
            Login
          </Button>
        </form>
        <div className='mx-auto mt-6'>
          <p className='font-semibold'>
            <span className='text-default-500'>New to our platform? </span>
            <Link
              href={routes.register}
              className='uppercase text-primary'
            >
              Create an account
            </Link>
          </p>
        </div>
      </FormProvider>

      {showOTPInputForm && (
        <OTPForm
          phoneNumber={parsePhoneNumber(formHandler.getValues('phoneNumber'), 'BD').number}
        />
      )}
    </>
  );
};
export default LoginPage;
