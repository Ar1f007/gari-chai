import { carPartsService } from '@/services/parts/car-part';
import Image from 'next/image';
import { Fragment, Suspense } from 'react';

type Props = {
  params: {
    slug: string;
  };
};

const SingleCarPartPage = async ({ params: { slug } }: Props) => {
  const carPart = await carPartsService.getPartDetails({
    slug,
  });

  const data = carPart.data;

  return (
    <Fragment>
      <Suspense>
        <div className='flex flex-col gap-5 md:flex-row md:gap-5 xl:gap-10'>
          {!data ? (
            <p>{carPart.message}</p>
          ) : (
            <div className='flex flex-col gap-10'>
              <div className='grid gap-10 lg:grid-cols-2'>
                <Image
                  src={data.posterImage.originalUrl}
                  alt={data.name}
                  width={400}
                  height={300}
                  className='h-auto w-full object-cover'
                />
              </div>
              <div>Description</div>
            </div>
          )}
        </div>
      </Suspense>
    </Fragment>
  );
};
export default SingleCarPartPage;
