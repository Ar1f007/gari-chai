import QueryResults from '@/modules/search/query-results';
import { QueryParams } from '@/types';
import { Suspense } from 'react';

const SearchPage = ({ searchParams }: { searchParams?: Partial<QueryParams> }) => {
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

  const queryParams = new URLSearchParams(searchParams);

  return (
    <div>
      <h1>SearchPage</h1>

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
