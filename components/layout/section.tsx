import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  classNames?: string;
} & Omit<HTMLAttributes<HTMLScriptElement>, 'className'>;

export const Section = ({ children, classNames, ...rest }: SectionProps) => {
  return (
    <section
      className={cn('mx-auto max-w-screen-2xl xl:px-6 2xl:px-0', classNames)}
      {...rest}
    >
      {children}
    </section>
  );
};
