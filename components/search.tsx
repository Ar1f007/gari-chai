'use client';

import { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/input';

import { SearchIcon } from '@/components/icons';
import { createUrl } from '@/lib/utils';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('query', search.value);
    } else {
      newParams.delete('query');
    }

    newParams.set('page', '1');
    newParams.set('limit', '20');

    router.push(createUrl('/search', newParams));
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className='xl-w-full relative w-full max-w-[550px] lg:w-80 xl:w-full'
      >
        <Input
          name='search'
          aria-label='Search'
          classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm',
          }}
          labelPlacement='outside'
          placeholder='Search cars eg. Honda elevate'
          startContent={
            <SearchIcon className='pointer-events-none flex-shrink-0 text-base text-default-400' />
          }
          type='search'
        />
      </form>
    </>
  );
}
