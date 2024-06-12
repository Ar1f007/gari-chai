import Link from 'next/link';
import { Card, CardHeader, CardBody } from '@nextui-org/card';

import { Logo } from '@/components/icons';
import { routes } from '@/config/routes';
import GoogleSignInButton from '@/components/auth/google-signin';
import { Suspense } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='flex min-h-screen justify-center bg-slate-800 bg-[url("https://images.unsplash.com/photo-1674514377288-96cbff0551fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-no-repeat px-2 py-12 xl:py-24 2xl:py-32'>
      <Card className='min-h-[200px] h-fit w-full max-w-xl py-10'>
        <CardHeader className='flex flex-col gap-5'>
          <Link href={routes.home}>
            <Logo />
          </Link>
        </CardHeader>
        <Suspense>
          <CardBody className='mx-auto xl:px-12'>
            {children}

            {/* <div className='mx-auto mb-5 mt-3 flex w-full items-center justify-evenly text-xl font-medium text-foreground before:mr-4 before:block before:h-px before:flex-grow before:bg-foreground-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-foreground-400'>
              or
            </div>
            <GoogleSignInButton /> */}
          </CardBody>
        </Suspense>
      </Card>
    </section>
  );
};
export default AuthLayout;
