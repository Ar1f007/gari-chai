import { routes } from '@/config/routes';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { LockIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <>
      <form className='mt-4 flex flex-col gap-6'>
        <Input
          type='text'
          variant='flat'
          required
          autoComplete='tel'
          placeholder='Phone number'
          aria-label='enter the phone number'
          endContent={
            <PhoneIcon className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
          }
        />

        <Input
          type='password'
          variant='flat'
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
    </>
  );
};
export default LoginPage;
