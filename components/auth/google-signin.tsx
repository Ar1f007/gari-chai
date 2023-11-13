'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/button';
import GoogleIcon from '@/public/images/google.svg';
import Image from 'next/image';
const GoogleSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className='w-full py-6'
      onClick={() => {}}
      variant='faded'
      color='default'
    >
      <Image
        src={GoogleIcon}
        alt='google logo'
      />

      <span className='ml-2 text-large font-semibold'>Continue with Google</span>
    </Button>
  );
};

export default GoogleSignInButton;
