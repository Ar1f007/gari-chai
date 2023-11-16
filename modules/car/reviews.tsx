import Link from 'next/link';

import { FilledStar } from '@/components/icons';
import { title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import Review from './review';
import WriteReview from '@/modules/car/write-review';
import { reviews } from '@/services/reviews';
import Sliders from '@/components/slider';

import { reviewKeenSliderOptions } from '@/lib/keen-slider/keen-slider-options';
import { routes } from '@/config/routes';

type ReviewsProps = {
  car: TCarSchema;
};
const Reviews = async ({ car }: ReviewsProps) => {
  const res = await reviews.getReviewsWithStats({ carId: car._id });

  if (!res || !res.reviews.length) {
    return null;
  }

  function getHref() {
    const url = routes.cars + '/' + car._id + routes.reviews;
    return url;
  }

  return (
    <section className='mt-8 rounded-xl bg-foreground-50 p-6'>
      <h2 className={title({ size: 'xs' })}>{car.name} User Reviews</h2>

      <div className='my-5 flex flex-col gap-5 md:flex-row'>
        <div className='flex items-end gap-1'>
          <FilledStar
            size={32}
            aria-label='Filled Star Icon'
          />
          <p className='flex items-end gap-2'>
            <span className='text-3xl font-semibold'>{res.averageRating}</span>
            <span className='text-default-500'>Based on reviews ({res.totalReviews})</span>
          </p>
        </div>

        <WriteReview carId={car._id} />
      </div>

      <div className='py-3'>
        <Sliders sliderOptions={{ options: reviewKeenSliderOptions }}>
          {res.reviews.map((review) => (
            <li
              className='keen-slider__slide max-w-[500px]'
              key={review._id}
            >
              <Review review={review} />
            </li>
          ))}
        </Sliders>

        <Link
          href={getHref()}
          className='mt-3 inline-block text-primary underline'
        >
          View All Reviews
        </Link>
      </div>
    </section>
  );
};
export default Reviews;
