import { SearchFilters } from '@/modules/search/search-filters';
import { ReactNode, Suspense } from 'react';

const SearchPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <section className='my-6 grid gap-1 px-4 sm:grid-cols-1 lg:grid-cols-5 xl:grid-cols-12'>
        <aside className='p-4 lg:col-span-2 xl:col-span-3'>
          <SearchFilters />
        </aside>
        <main className='p-4 lg:col-span-3 xl:col-span-9'>{children}</main>
      </section>
    </Suspense>
  );
};

export default SearchPageLayout;
