import { Ratings } from '@/components/ratings';

const Review = () => {
  return (
    <blockquote className='flex h-full flex-col justify-between rounded bg-default-100 p-12'>
      <h4
        className='mb-2 truncate text-xl font-medium'
        title='Excellent car'
      >
        Excellent Car
      </h4>

      <Ratings stars={4.5} />

      <div className='mt-4'>
        <p className='mt-4 leading-relaxed text-gray-500'>
          It is a refreshing choice to explore within the entry-level SUV segment. With appealing
          French styling.
        </p>
      </div>

      <footer className='mt-8 text-sm text-gray-500'>&mdash; John Doe</footer>
    </blockquote>
  );
};
export default Review;
