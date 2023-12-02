import { Suspense } from 'react';
import QueryResults from '@/modules/search/query-results';
import { QueryParams } from '@/types';
import { z } from 'zod';
import { fetchFilteredCars } from '@/services/search';
import { title } from '@/components/primitives';
import Pagination from '@/components/pagination';

const queryParamSchema = z.optional(
  z.string().refine((val) => {
    if (val) {
      return val.length >= 1;
    }
    return true;
  }),
);

const searchParamsSchema = z
  .object({
    query: queryParamSchema,
    car: queryParamSchema,
    budget: queryParamSchema,
    bodyType: queryParamSchema,
    brand: queryParamSchema,
    model: queryParamSchema,
    city: queryParamSchema,
    scope: queryParamSchema,
  })
  .refine(({ scope, query }) => {
    if (scope?.length && scope === 'global' && !query?.length) {
      return false;
    }
    return true;
  });

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
        fallback={<div>To be replaced soon</div>}
      >
        <div className='flex flex-col space-y-5'>
          {hasResults && (
            <h2 className={title({ size: 'xs' })}>Total: {res.data.pagination.totalResults}</h2>
          )}
          <QueryResults items={res.data.results} />
        </div>
      </Suspense>
      {hasResults && <Pagination totalPages={res.data.pagination.totalPages} />}
    </div>
  );
};

export default SearchPage;
