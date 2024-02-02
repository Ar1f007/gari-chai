import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404',
  description: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-8'>
      <h1 className='text-3xl lg:text-5xl'>Page Not Found</h1>
      <p className='text-lg'>
        The page you tried to access does not exist or is temporarily unavailable
      </p>
      <Link
        href='/'
        className='rounded-md bg-primary-500 px-4 py-2 text-white hover:opacity-95'
      >
        Go to Home
      </Link>
    </div>
  );
}
