'use client';

import { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/input';

import { SearchIcon } from '@/components/icons';
import { createUrl } from '@/lib/utils';
import { DEFAULT_PAGINATION_ITEMS_LIMIT } from '@/lib/constants';

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
      newParams.set('scope', 'global');
    } else {
      newParams.delete('query');
      newParams.delete('scope');
    }

    // if (!search.value.length) return; // prevent user from searching with an empty value

    newParams.set('page', newParams.get('page') || '1');
    newParams.set('limit', newParams.get('limit') || DEFAULT_PAGINATION_ITEMS_LIMIT.toString());

    router.push(createUrl('/search', newParams));
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className='relative w-full max-w-[550px] lg:w-80 xl:w-full'
      >
        <Input
          name='search'
          aria-label='Search'
          classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm',
          }}
          labelPlacement='outside'
          placeholder='Search cars by name, brand or body style...'
          startContent={
            <SearchIcon className='pointer-events-none flex-shrink-0 text-base text-default-400' />
          }
          type='search'
        />
      </form>
    </>
  );
}
