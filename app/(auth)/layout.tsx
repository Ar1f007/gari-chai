import Link from 'next/link';
import { Card, CardHeader, CardBody } from '@nextui-org/card';

import { Logo } from '@/components/icons';
import { routes } from '@/config/routes';
import GoogleSignInButton from '@/components/auth/google-signin';
import { Suspense } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='flex min-h-full overflow-hidden px-2 pt-16 sm:py-20'>
      <Card className='mx-auto w-full max-w-2xl py-10'>
        <CardHeader className='flex flex-col gap-5'>
          <Link href={routes.home}>
            <Logo />
          </Link>
        </CardHeader>
        <CardBody className='mx-auto max-w-md'>
          {children}

          <div className='mx-auto my-5 flex w-full items-center justify-evenly text-xl font-medium text-foreground before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
          </div>
          <Suspense>
            <GoogleSignInButton />
          </Suspense>
        </CardBody>
      </Card>
    </section>
  );
};
export default AuthLayout;
