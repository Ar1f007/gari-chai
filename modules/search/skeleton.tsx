import repeat from '@/util/repeat';

const SearchResultLoadingSkeleton = ({ instance = 3 }: { instance?: number }) => {
  return (
    <ul className='flex flex-col gap-5'>
      {repeat(instance).map((item) => (
        <li key={item}>
          <div className='mx-auto w-full overflow-hidden rounded-md border shadow-md'>
            <div className='flex space-x-4 motion-safe:animate-pulse'>
              <div className='h-[140px] w-40 bg-slate-300'></div>
              <div className='flex-1 space-y-6 py-4 pr-4'>
                <div className='h-12 rounded bg-slate-300'></div>
                <div className='space-y-3'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2 h-6 rounded bg-slate-300'></div>
                    <div className='col-span-1 h-6 rounded bg-slate-300'></div>
                  </div>
                  {/* <div className='h-6 rounded bg-slate-300'></div> */}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default SearchResultLoadingSkeleton;
