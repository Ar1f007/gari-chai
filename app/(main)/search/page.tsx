import { Suspense } from 'react';
import QueryResults from '@/modules/search/query-results';
import { QueryParams } from '@/types';
import { fetchFilteredCars } from '@/services/search';
import { title } from '@/components/primitives';
import Pagination from '@/components/pagination';
import SearchResultLoadingSkeleton from '@/modules/search/skeleton';
import { searchParamsSchema } from '@/schema';
import Search from '@/components/search';

//TODO: REMOVE DUPLICATION OF THE SEARCH FIELD BEING USED IN MULTIPLE PLACE

const SearchPage = async ({ searchParams }: { searchParams?: Partial<QueryParams> }) => {
  const parsedParams = searchParamsSchema.safeParse(searchParams);

  if (!parsedParams.success) {
    return (
      <div className='max-w-5xl'>
        <p className='text-center font-medium text-foreground'>
          Please type something in the search box.
        </p>
        ;
      </div>
    );
  }

  const queryParams = new URLSearchParams(parsedParams.data);

  const res = await fetchFilteredCars(queryParams);

  if (typeof res === 'string') {
    return (
      <div className='space-y-5'>
        <div className='lg:hidden'>
          <Search />
        </div>
        <p className='text-center text-xl font-medium'>{res}</p>;
      </div>
    );
  }

  if (res.status !== 'success') {
    return (
      <div className='space-y-5'>
        <div className='lg:hidden'>
          <Search />
        </div>
        <p className='text-center text-xl font-medium'>{res.message}</p>;
      </div>
    );
  }

  const hasResults = !!res.data.results.length;

  return (
    <div className='flex flex-col space-y-5 lg:space-y-0'>
      <div className='lg:hidden'>
        <Search />
      </div>

      <Suspense
        key={queryParams.toString()}
        fallback={<SearchResultLoadingSkeleton />}
      >
        <div className='flex flex-col space-y-5'>
          {hasResults && (
            <h2 className={title({ size: 'xs' })}>Total: {res.data.pagination.totalItems}</h2>
          )}
          <QueryResults items={res.data.results} />
        </div>
      </Suspense>
      {hasResults && <Pagination totalPages={res.data.pagination.totalPages} />}
    </div>
  );
};

export default SearchPage;
