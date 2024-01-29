import Colors from '@/modules/car/colors';
import Comments from '@/modules/car/comments';
import CarDescription from '@/modules/car/description';
import CarImage from '@/modules/car/new-car/car-image';
import CarInfo from '@/modules/car/new-car/car-info';
import Reviews from '@/modules/car/reviews';
import { CarImageSkeleton } from '@/modules/car/skeletons/image';
import CarInfoSkeleton from '@/modules/car/skeletons/info';
import SpecificationsSkeleton from '@/modules/car/skeletons/specification';
import CarDetailsTopInfoPlaceholder from '@/modules/car/skeletons/top-part';
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
      <Suspense fallback={<CarDetailsTopInfoPlaceholder />}>
        <div className='flex flex-col gap-5 md:flex-row md:gap-5 xl:gap-10'>
          <CarImage car={car} />

          <CarInfo car={car} />
        </div>

        <Specifications car={car} />

        {car.description && <CarDescription text={car.description} />}

        <Colors car={car} />
      </Suspense>

      <Suspense>
        <Reviews car={car} />
      </Suspense>

      <Suspense>
        <Comments carId={car._id} />
      </Suspense>
    </Fragment>
  );
}
