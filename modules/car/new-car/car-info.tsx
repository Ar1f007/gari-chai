import { subtitle, title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import AddToWishlist from './add-to-wishlist';
import OfferBtn from '../offer-btn';
import { reviewsService } from '@/services/reviews';
import { Ratings } from '@/components/ratings';
import { formatRangeToLakhCrore } from '@/lib/utils';

type Props = {
  car: TCarSchema;
};

const CarInfo = async ({ car }: Props) => {
  const { name, price } = car;

  const reviewsInfo = await reviewsService.getReviewsWithStats({ carId: car._id });

  return (
    <div className='flex w-full max-w-4xl flex-col gap-4 xl:gap-8'>
      <h1 className={title()}>{name}</h1>

      {reviewsInfo && (
        <div className='mt-1 flex items-center gap-1'>
          <div className='flex items-center'>
            <Ratings
              stars={reviewsInfo.averageRating}
              hideEmptyStar
            />
            {reviewsInfo.averageRating.toFixed(2)}
          </div>

          <span className='inline-block text-base'>Reviews ({reviewsInfo.totalReviews})</span>
        </div>
      )}

      <p className={subtitle({ className: 'my-0 ml-1 font-bold' })}>
        {formatRangeToLakhCrore(price.min, price.max)}
        {price.isNegotiable && (
          <>
            <sup className='text-primary'>*</sup>
            <small className='text-xs text-foreground'>(Negotiable)</small>
          </>
        )}
      </p>

      <OfferBtn />

      {/* <AddToWishlist /> */}
    </div>
  );
};
export default CarInfo;
