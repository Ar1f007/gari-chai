import Link from 'next/link';
import Copyright from './copyright';
import { Logo } from '@/components/icons';

const Footer = () => {
  return (
    <div className='mt-4 bg-default-50 lg:mt-8'>
      <footer className='mt-auto py-6 dark:bg-gray-900'>
        <div className='mx-auto w-full py-4'>
          <div className='mx-auto max-w-screen-xl px-4 sm:flex sm:items-center sm:justify-between'>
            <div className='mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse'>
              <Logo />
            </div>

            <ul className='mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0'>
              <li>
                <Link
                  href='#'
                  className='me-4 hover:underline md:me-6'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='me-4 hover:underline md:me-6'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='me-4 hover:underline md:me-6'
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:underline'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className='my-6 border-gray-200 dark:border-gray-700 sm:mx-auto' />
          <Copyright />
        </div>
      </footer>
    </div>
  );
};
export default Footer;
