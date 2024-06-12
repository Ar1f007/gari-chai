import { ReactNode } from 'react';

const CarLayout = ({ children }: { children: ReactNode }) => {
  return <section className='mx-auto max-w-screen-2xl px-6 py-6 2xl:px-0'>{children}</section>;
};
export default CarLayout;
