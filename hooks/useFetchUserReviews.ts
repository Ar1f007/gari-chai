import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { ReviewBody } from '@/schema/review';
import { reviewsService } from '@/services/reviews';
import { userStore } from '@/store';
import { useState, useEffect, useCallback } from 'react';
import { useSnapshot } from 'valtio';

export const useFetchUserReviews = () => {
  const userSnap = useSnapshot(userStore);

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewBody[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUserReviews = useCallback(async (userId: string) => {
    try {
      const res = await reviewsService.getUserReviews({ userId });

      if (res.status == 'success') {
        setReviews(res.data);
        return;
      }

      setError(res.message || GENERIC_ERROR_MSG);
    } catch (error) {
      setError(GENERIC_ERROR_MSG);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userStore.status == 'pending') return;

    if (!userStore.user) return;

    fetchUserReviews(userStore.user._id);
  }, [userSnap]);

  return { loading, reviews, error, refetch: fetchUserReviews };
};
