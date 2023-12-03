import { Car } from '@/components/car/new-car-card';
import { Section } from '@/components/layout/section';
import Pagination from '@/components/pagination';
import { getCars } from '@/services/car/getCars';

const LatestCarsPage = async () => {
  const res = await getCars('latest-cars');

  if (typeof res === 'string') {
    return <p className='text-center'>{res}</p>;
  }

  return (
    <Section classNames='py-10'>
      {res.cars.length === 0 && <p className='text-center'>Phew! List is empty.</p>}

      <div className='flex flex-col space-y-5'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {res.cars.map((car) => (
            <Car
              car={car}
              key={car._id}
            />
          ))}
        </div>

        {res.pagination.totalItems > 0 && <Pagination totalPages={res.pagination.totalPages} />}
      </div>
    </Section>
  );
};
export default LatestCarsPage;
