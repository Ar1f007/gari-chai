import { Suspense } from 'react';
import QueryResults from '@/modules/search/query-results';
import { QueryParams } from '@/types';
import { fetchFilteredCars } from '@/services/search';
import { title } from '@/components/primitives';
import Pagination from '@/components/pagination';
import SearchResultLoadingSkeleton from '@/modules/search/skeleton';
import { searchParamsSchema } from '@/schema';

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

  const queryParams = new URLSearchParams(searchParams);

  const res = await fetchFilteredCars(queryParams);

  if (typeof res === 'string') {
    return <p>{res}</p>;
  }

  if (res.status !== 'success') {
    return <p>{res.message}</p>;
  }

  const hasResults = !!res.data.results.length;

  return (
    <div className='flex flex-col space-y-5'>
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
