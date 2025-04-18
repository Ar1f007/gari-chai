'use client';

import { title } from '@/components/primitives';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const defaultMessage = 'Oops! Something went wrong.';
  const [countdown, setCountdown] = useState(30);

  const message = process.env.NODE_ENV === 'production' ? defaultMessage : error.message;

  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='container flex h-screen flex-col items-center justify-center gap-8 p-5 text-center'>
      <h1 className={title({ size: 'sm', })}>
        {process.env.NODE_ENV === 'production'
          ? "API is currently waking up after a period of inactivity."
          : message}
      </h1>

      <p className='font-medium md:text-xl max-w-4xl text-gray-700'>
        Reason: API is hosted on a free-tier service which goes to sleep after inactivity. It{"'"}s now starting up and should be ready in {countdown} seconds. Thank you for your patience!
      </p>

      <div className="flex gap-4">
        <Button
          onClick={reset}
          variant='faded'
          color='primary'
          className='text-lg font-semibold leading-none'
          size='lg'
        >
          Try again
        </Button>
        <Button
          onClick={() => window.location.reload()}
          variant='flat'
          color='primary'
          className='text-lg font-semibold leading-none'
          size='lg'
        >
          Reload
        </Button>
      </div>
    </div>
  );
}
