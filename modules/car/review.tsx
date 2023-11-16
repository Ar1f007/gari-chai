import { Ratings } from '@/components/ratings';
import { ReviewBody } from '@/schema/review';

const Review = ({ review }: { review: ReviewBody }) => {
  return (
    <blockquote className='flex h-full flex-col justify-between rounded bg-default-100 p-6'>
      <h4
        className='mb-2 truncate text-xl font-medium'
        title='Excellent car'
      >
        {review.title}
      </h4>

      <Ratings stars={review.rating} />

      <div className='mt-4'>
        <p
          className='mt-4 line-clamp-4 leading-relaxed text-gray-500'
          title={review.review}
        >
          {review.review}
        </p>
      </div>

      <footer className='mt-8 text-sm text-gray-500'>&mdash; {review.userInfo.name}</footer>
    </blockquote>
  );
};
export default Review;
