export const CarImageSkeleton = () => {
  return (
    <div className='max-w-[550px] space-y-5 rounded-md motion-safe:animate-pulse'>
      <div className='h-[200px] w-[300px] rounded-md bg-slate-300 lg:h-[350px] lg:w-[500px]' />
      <div className='flex flex-wrap items-end gap-4'>
        <div className='h-[50px] w-[50px] rounded-lg bg-slate-300' />
        <div className='h-[50px] w-[50px] rounded-lg bg-slate-300' />
        <div className='h-[50px] w-[50px] rounded-lg bg-slate-300' />
      </div>
    </div>
  );
};
