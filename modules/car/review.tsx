import dayjs from 'dayjs';

import { Ratings } from '@/components/ratings';
import { ReviewBody } from '@/schema/review';

const Review = ({ review }: { review: ReviewBody }) => {
  return (
    <blockquote className='flex h-full flex-col justify-between overflow-hidden rounded-2xl border-1 border-solid border-gray-300 bg-default-100 p-6'>
      <h4
        className='mb-2 truncate text-xl font-medium text-gray-700'
        title='Excellent car'
      >
        {review.title}
      </h4>

      <Ratings stars={review.rating} />

      <p
        className='my-2 line-clamp-4 leading-relaxed text-gray-500'
        title={review.review}
      >
        {review.review}
      </p>

      <footer className='flex flex-col gap-1'>
        <span className='text-base font-medium capitalize text-gray-700'>
          By {review.userInfo.firstName} {review.userInfo.lastName}
        </span>
        <span className='text-sm text-gray-500'>
          on {dayjs(review.updatedAt).format('MMM MM, YYYY')}
        </span>
      </footer>
    </blockquote>
  );
};
export default Review;
