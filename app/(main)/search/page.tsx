import { Suspense } from 'react';
import QueryResults from '@/modules/search/query-results';
import { QueryParams } from '@/types';
import { z } from 'zod';

//   const {
//     query = '',
//     page = '1',
//     limit = '20',
//     car = '',
//     budget = '',
//     bodyType = '',
//     brand = '',
//     model = '',
//     city = 'all',
//     scope = 'global',
//   } = searchParams || {};

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

const SearchPage = ({ searchParams }: { searchParams?: Partial<QueryParams> }) => {
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

  return (
    <div>
      <Suspense
        key={queryParams.toString()}
        fallback={<div>To be replaced soon</div>}
      >
        <QueryResults query={queryParams} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
