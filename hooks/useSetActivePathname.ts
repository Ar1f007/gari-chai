'use client';
import { settingsActions } from '@/store';
import { usePathname } from 'next/navigation';

export const useSetActivePathname = () => {
  const pathname = usePathname();

  settingsActions.setCurrentActivePathname(pathname);

  return pathname;
};
