import { FilledStar } from '@/components/icons';
import { title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import { Button } from '@nextui-org/button';
import Review from './review';
import { getCarReview } from '@/services/car/getCarReview';

type ReviewsProps = {
  car: TCarSchema;
};
const Reviews = async ({ car }: ReviewsProps) => {
  const reviews = await getCarReview({ carId: car._id });

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
            <span className='text-3xl font-semibold'>4.4</span>
            <span className='text-default-500'>Based on reviews (300)</span>
          </p>
        </div>

        <Button
          variant='bordered'
          color='primary'
        >
          Write a Review
        </Button>
      </div>

      <div>
        <Review />
      </div>
    </section>
  );
};
export default Reviews;
