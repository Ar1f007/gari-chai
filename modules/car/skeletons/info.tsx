const CarInfoSkeleton = () => {
  return (
    <div className='flex flex-col gap-5 motion-safe:animate-pulse xl:gap-8'>
      <div className='h-[40px] w-[300px] rounded-md bg-slate-300 lg:w-[450px]' />
      <div className='h-[20px] w-[250px] rounded-md bg-slate-300 lg:w-[200px]' />
      <div>
        <div className='mb-5 hidden h-[30px] w-[280px] rounded-md bg-slate-300 md:block lg:w-[250px]' />
        <div className='mb-3 hidden h-[40px] w-[280px] rounded-lg bg-slate-300 md:block lg:w-[450px]' />

        <div className='h-[10px] w-[300px] rounded-md bg-slate-300 lg:w-[300px]' />
      </div>
      <div className='flex items-center gap-2'>
        <div className='h-[40px] w-[40px] rounded-full bg-slate-300' />
        <div className='h-[10px] w-[100px] rounded-md bg-slate-300' />
      </div>
    </div>
  );
};
export default CarInfoSkeleton;
