'use client';

import { title } from '@/components/primitives';
import { Button } from '@nextui-org/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const defaultMessage = 'Oops! Something went wrong.';

  const message = process.env.NODE_ENV === 'production' ? defaultMessage : error.message;

  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className='container flex h-screen flex-col items-center justify-center gap-8 p-5 text-center'>

      <h1 className={title({ size: 'sm', })}>
        {process.env.NODE_ENV === 'production'
          ? "Our API is currently waking up after a period of inactivity."
          : message}
      </h1>

      <p className='font-medium md:text-xl max-w-4xl text-gray-700'>
        {process.env.NODE_ENV === 'production'
          ? "This temporary downtime is due to using a free-tier API during development. It should be back online shortly (within 15-25sec). Please try again in a moment!"
          : "Don't worry, our team is already on it and working to fix the issue."}
      </p>

      <Button
        onClick={reset}
        variant='flat'
        color='primary'
        className='text-lg font-semibold leading-none'
        size='lg'
      >
        Try again
      </Button>
    </div>
  );
}
