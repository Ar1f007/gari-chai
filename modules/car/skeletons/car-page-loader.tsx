import { CarImageSkeleton } from './image';
import CarInfoSkeleton from './info';
import SimilarCarsSkeleton from './similar';
import SpecificationsSkeleton from './specification';

const CarPageLoader = () => {
  return (
    <div className='flex flex-row gap-5 overflow-hidden xl:px-10'>
      <div className='col-span-3 flex flex-col space-y-10'>
        <div className='flex flex-col gap-5 md:flex-row md:gap-5 xl:gap-10'>
          <CarImageSkeleton />
          <CarInfoSkeleton />
        </div>

        <SpecificationsSkeleton />
      </div>

      <SimilarCarsSkeleton />
    </div>
  );
};
export default CarPageLoader;
