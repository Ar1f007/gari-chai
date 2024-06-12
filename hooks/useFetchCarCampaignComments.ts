import { getCampaignComments } from '@/services/campaign/car-comment';
import { campaignActions } from '@/store';
import { useEffect } from 'react';

type UseFetchCarCampaignCommentsParams = {
  campaignId: string;
  carId: string;
};
export const useFetchCarCampaignComments = ({
  campaignId,
  carId,
}: UseFetchCarCampaignCommentsParams) => {
  async function fetchComments() {
    const res = await getCampaignComments({
      campaignId,
      carId,
    });

    campaignActions.setComments(res);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    refetch: fetchComments,
  };
};
