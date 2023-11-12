import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { MailIcon } from 'lucide-react';

import GoogleSignInButton from '@/components/auth/google-signin';
import { Logo } from '@/components/icons';
import { routes } from '@/config/routes';

const LoginPage = () => {
  return (
    <section className='flex min-h-full overflow-hidden px-2 pt-16 sm:py-28'>
      <Card className='mx-auto w-full max-w-2xl py-10'>
        <CardHeader className='flex flex-col gap-5'>
          <Link href={routes.home}>
            <Logo />
          </Link>
        </CardHeader>
        <CardBody className='mx-auto max-w-md'>
          <form className='mt-4'>
            <Input
              type='email'
              variant='flat'
              required
              autoComplete='email'
              placeholder='Sign in with your email'
              aria-label='Sign in with your email'
              endContent={
                <MailIcon className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
              }
            />

            <Button
              variant='faded'
              fullWidth
              className='mt-6 py-6 text-large font-semibold'
              color='primary'
            >
              Continue with Email
            </Button>
          </form>
          <div className='mx-auto my-5 flex w-full items-center justify-evenly text-xl font-medium text-foreground before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
          </div>
          <GoogleSignInButton />
        </CardBody>
      </Card>
    </section>
  );
};
export default LoginPage;
