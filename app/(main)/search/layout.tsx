import { SearchFilters } from '@/modules/search/search-filters';
import { ReactNode } from 'react';

const SearchPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='my-6 grid gap-4 px-4 sm:grid-cols-1 lg:grid-cols-5'>
      <aside className='p-4 xl:col-span-1'>
        <SearchFilters />
      </aside>
      <main className='col-span-3 p-4'>{children}</main>
    </section>
  );
};

export default SearchPageLayout;
