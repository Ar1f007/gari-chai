import Link from 'next/link';

import { Logo } from '@/components/icons';
import Search from '@/components/search';
import { routes } from '@/config/routes';
import { Suspense } from 'react';
import AuthButton from './auth-button';

const TopHeader = () => {
  return (
    <div className='gap container mx-auto hidden h-16 w-full max-w-screen-2xl items-center gap-1 px-6 lg:flex 2xl:px-0'>
      <div className='shrink-0 basis-1/3'>
        <Link href={routes.home}>
          <Logo />
        </Link>
      </div>

      <div className='shrink-0 basis-1/3'>
        <Suspense>
          <Search />
        </Suspense>
      </div>

      <div className='basic-1/3 flex w-full justify-end text-primary'>
        <AuthButton />
      </div>
    </div>
  );
};

export default TopHeader;
