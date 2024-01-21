'use client';

import * as React from 'react';
import * as NextNavigation from 'next/navigation';
import * as ReactHookForm from 'react-hook-form';
import * as LoginSchema from '@/schema/login';
import * as Resolver from '@hookform/resolvers/zod';

import { RHFInput } from '@/components/form/RHFInput';
import { Button } from '@nextui-org/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { AuthenticationMethods } from '@/schema/register';
import { z } from 'zod';
import { auth } from '@/services/user';
import { toast } from 'sonner';
import { userActions } from '@/store';
import { getRedirectPath } from '@/lib/utils';
import { mapValidationErrors } from '@/util/mapValidationError';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { TApiData, TApiError } from '@/types';
import { TAuthBasicUserInfo } from '@/schema/user';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const router = NextNavigation.useRouter();

  const params = NextNavigation.useSearchParams();

  const form = ReactHookForm.useForm<z.infer<typeof LoginSchema.loginSchema>>({
    criteriaMode: 'all',
    mode: 'onTouched',
    resolver: Resolver.zodResolver(LoginSchema.loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function handleLoginResponse(res: TApiError | TApiData<TAuthBasicUserInfo>) {
    if (res.status === 'success') {
      userActions.setUser(res.data);

      router.push(getRedirectPath(params));
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

  function validateUsername(username: string): 'email' | 'phone' | null {
    const parsedEmail = LoginSchema.loginWithEmailSchema.shape.email.safeParse(username);
    const parsedPhone = LoginSchema.loginWithPhoneSchema.shape.phone.safeParse(username);

    if (parsedEmail.success) {
      return 'email';
    }

    if (parsedPhone.success) {
      return 'phone';
    }

    return null;
  }

  async function onSubmit(data: z.infer<typeof LoginSchema.loginSchema>) {
    try {
      const method = validateUsername(data.username);

      if (!method) {
        form.setError('username', { message: 'Invalid email or phone number' });
        return;
      }

      const payload = {
        [method]: data.username,
        password: data.password,
      } as LoginSchema.LoginWithEmailSchema | LoginSchema.LoginWithPhoneSchema;

      const res = await auth.login({ loginMethod: method, payload });
      handleLoginResponse(res);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : GENERIC_ERROR_MSG);
    }
  }

  return (
    <div className='space-y-5'>
      <ReactHookForm.FormProvider {...form}>
        <form
          className='mt-4 flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <RHFInput
            label='Email or Phone Number'
            name='username'
            autoComplete='username'
            isRequired
          />

          <RHFInput
            label='Password'
            name='password'
            isRequired
            autoComplete='new-password'
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

          <Button
            variant='faded'
            fullWidth
            className='py-6 text-large font-semibold'
            color='primary'
            type='submit'
            isLoading={form.formState.isSubmitting}
          >
            Login
          </Button>
        </form>
      </ReactHookForm.FormProvider>

      <p className='text-center text-sm font-semibold'>
        <span className='text-default-500'>New to our platform? </span>
        <Link
          href={routes.register}
          className='uppercase text-primary'
        >
          Create an Account
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
