'use client';

import { Section } from '@/components/layout/section';
import { Ratings } from '@/components/ratings';
import { useFetchUserReviews } from '@/hooks/useFetchUserReviews';
import extendedDayjs from '@/lib/dayjs';
import { ReviewBody } from '@/schema/review';
import { Chip, ChipProps } from '@nextui-org/chip';

import { Spinner } from '@nextui-org/spinner';
import { CheckIcon, CircleDotIcon, XCircleIcon } from 'lucide-react';
import ReviewActionButtons from '@/modules/user/review-action-buttons';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store';

const MyReviewsPage = () => {
  const { loading, error, reviews, refetch } = useFetchUserReviews();

  function getChipIcon(status: ReviewBody['status']) {
    if (status == 'pending') {
      return (
        <CircleDotIcon
          className='text-white'
          size={18}
        />
      );
    } else if (status == 'approved') {
      return (
        <CheckIcon
          size={18}
          className='text-white'
        />
      );
    } else {
      return <XCircleIcon size={18} />;
    }
  }

  function getChipColor(status: ReviewBody['status']): ChipProps['color'] {
    if (status == 'pending') {
      return 'warning';
    } else if (status == 'approved') {
      return 'secondary';
    } else {
      return 'danger';
    }
  }

  if (loading) {
    return (
      <div className='flex h-[calc(100vh_-_300px)] items-center justify-center'>
        <Spinner
          size='md'
          color='primary'
        />
      </div>
    );
  }

  return (
    <Section classNames='py-10'>
      {error ? (
        <p className='text-center'>{error}</p>
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {reviews.map((review) => (
            <blockquote
              key={review._id}
              className='flex h-full flex-col justify-between overflow-hidden rounded-2xl border-1 border-solid border-gray-300 bg-default-100 p-6'
            >
              <h4 className='text-xl font-medium text-gray-700 first-letter:capitalize'>
                {review.title}
              </h4>

              <p
                className='my-2 line-clamp-4 leading-relaxed text-gray-500 first-letter:capitalize'
                title={review.review}
              >
                {review.review}
              </p>

              <footer className='flex flex-col gap-1'>
                <div className='flex flex-wrap items-center justify-between gap-1'>
                  <Ratings stars={review.rating} />
                  <div className='flex items-center gap-2'>
                    <Chip
                      startContent={getChipIcon(review.status)}
                      color={getChipColor(review.status)}
                      className='capitalize'
                    >
                      {review.status}
                    </Chip>

                    <ReviewActionButtons
                      review={review}
                      refetch={refetch}
                    />
                  </div>
                </div>

                {review.discardReason && (
                  <div
                    className='relative my-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'
                    role='alert'
                  >
                    <p className='capitalize'>Discard Reason: {review.discardReason}</p>
                  </div>
                )}
                <span className='text-sm text-gray-500'>
                  on {extendedDayjs(review.updatedAt).format('MMM MM, YYYY')}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      )}
    </Section>
  );
};
export default MyReviewsPage;
