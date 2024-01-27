'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/input';

import { SearchIcon } from '@/components/icons';
import { createUrl } from '@/lib/utils';
import { DEFAULT_PAGINATION_ITEMS_LIMIT } from '@/lib/constants';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

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

    // if (!search.value.length) return; // prevent user from searching with an empty value

    newParams.set('page', newParams.get('page') || '1');
    newParams.set('limit', newParams.get('limit') || DEFAULT_PAGINATION_ITEMS_LIMIT.toString());
    newParams.set('scope', 'global');

    router.push(createUrl('/search', newParams));
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    const query = searchParams.get('query');
    if (!query?.length) {
      newParams.delete('query');
      newParams.delete('scope');

      router.push(createUrl('/search', newParams));
    }
  }, [router, searchParams]);

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
