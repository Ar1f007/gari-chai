'use client';

import { RHFInput } from '@/components/form/RHFInput';
import { routes } from '@/config/routes';
import { RegisterInputs, registerSchema } from '@/schema/register';
import { Button } from '@nextui-org/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, PhoneIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

import { FormProvider, useForm } from 'react-hook-form';

const RegisterPage = () => {
  const formHandler = useForm<RegisterInputs>({
    criteriaMode: 'firstError',
    mode: 'onTouched',
    defaultValues: {
      name: '',
      password: '',
      phoneNumber: '',
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInputs) {
    console.log(data);
  }

  return (
    <>
      <FormProvider {...formHandler}>
        <form
          className='mt-4 flex flex-col gap-6'
          onSubmit={formHandler.handleSubmit(onSubmit)}
        >
          <RHFInput
            name='name'
            required
            autoComplete='name'
            placeholder='Your name'
            aria-label='enter your name'
            endContent={
              <UserIcon className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
            }
          />

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
          >
            Create Account
          </Button>
        </form>
      </FormProvider>

      <div className='mx-auto mt-6'>
        <p className='font-semibold'>
          <span className='text-default-500'>Already have an account? </span>
          <Link
            href={routes.login}
            className='uppercase text-primary'
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
};
export default RegisterPage;
