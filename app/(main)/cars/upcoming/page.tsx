import { Car } from '@/components/car/new-car-card';
import { Section } from '@/components/layout/section';
import Pagination from '@/components/pagination';
import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { searchParamsSchema } from '@/schema';
import { getCars } from '@/services/car/getCars';
import { TCarsPageParams } from '@/types';

const PopularCarsPage = async ({ searchParams }: TCarsPageParams) => {
  const parsedParams = searchParamsSchema.safeParse(searchParams);

  if (!parsedParams.success) {
    return (
      <div className='max-w-5xl'>
        <p className='text-center font-medium text-foreground'>
          Please type something in the url query.
        </p>
        ;
      </div>
    );
  }

  const queryParams = new URLSearchParams(searchParams);

  queryParams.set('tags', HOME_SETTINGS_OPTIONS.upcomingCars);

  const res = await getCars(queryParams);

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
export default PopularCarsPage;
