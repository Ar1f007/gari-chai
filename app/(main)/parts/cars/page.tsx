import { Section } from '@/components/layout/section';
import Pagination from '@/components/pagination';
import CarPartCard from '@/modules/home/car-parts/car-part-card';
import { TCarPartQuerySchema, carPartQuerySchema } from '@/schema/car-part';
import { getCarParts } from '@/services/car/get-car-parts';

const CarParts = async ({ searchParams }: { searchParams: Partial<TCarPartQuerySchema> }) => {
  const parsedParams = carPartQuerySchema.partial().safeParse(searchParams);

  if (!parsedParams.success) {
    console.log(parsedParams.error.errors.map((e) => ({ m: e.message, p: e.path })));
    return (
      <div className='max-w-5xl'>
        <p className='text-center font-medium text-foreground'>Invalid Query Params Provided</p>;
      </div>
    );
  }

  const queryParams = new URLSearchParams(searchParams);

  const res = await getCarParts(queryParams);

  if (!res.data) {
    return <p className='font-medium text-foreground'>{res.message}</p>;
  }

  return (
    <Section classNames='py-10'>
      {res.data.carParts.length === 0 && <p className='text-center'>Phew! List is empty.</p>}

      <div className='flex flex-col space-y-5'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {res.data.carParts.map((part) => (
            <CarPartCard
              carPart={part}
              key={part._id}
            />
          ))}
        </div>

        {res.data.pagination.totalItems > 0 && (
          <Pagination totalPages={res.data.pagination.totalPages} />
        )}
      </div>
    </Section>
  );
};
export default CarParts;
