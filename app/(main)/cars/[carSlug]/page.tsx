import Colors from '@/modules/car/colors';
import Comments from '@/modules/car/comments';
import CarImage from '@/modules/car/new-car/car-image';
import CarInfo from '@/modules/car/new-car/car-info';
import Reviews from '@/modules/car/reviews';
import Specifications from '@/modules/car/specifications';

import { getCarBySlug } from '@/services/car/getCarBySlug';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';

type Props = {
  params: {
    carSlug: string;
  };
};

export default async function CarDetailsPage(props: Props) {
  const {
    params: { carSlug },
  } = props;

  const car = await getCarBySlug({
    slug: carSlug,
    carType: 'new-car',
  });

  if (!car) {
    notFound();
  }

  return (
    <Fragment>
      <div className='flex flex-col gap-5 xl:flex-row xl:gap-10'>
        <CarImage car={car} />

        <Suspense>
          <CarInfo car={car} />
        </Suspense>
      </div>

      <Specifications car={car} />

      <Colors car={car} />

      <Suspense>
        <Reviews car={car} />
      </Suspense>

      <Suspense>
        <Comments carId={car._id} />
      </Suspense>
    </Fragment>
  );
}
