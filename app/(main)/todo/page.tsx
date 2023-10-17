'use client';
import { useSetActivePathname } from '@/hooks/useSetActivePathname';
import { usePathname } from 'next/navigation';

const A = () => {
  const p = usePathname();

  return <>{p}</>;
};

const Page = () => {
  return (
    <div>
      <A />
    </div>
  );
};
export default Page;
