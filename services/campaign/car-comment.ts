import { z } from 'zod';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { carCampaignComment } from '@/schema/campaign';

export async function createNewCampaignComment(payload: any) {
  try {
    const res = await apiFetch(endpoints.api.campaigns.comments + '/cars', {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}

type GetCommentsParams = {
  campaignId: string;
  carId: string;
};

export async function getCampaignComments(params: GetCommentsParams) {
  try {
    const url = `${endpoints.api.campaigns.comments}/${params.campaignId}/${params.carId}`;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,
      next: {
        revalidate: 30,
      },
    });

    if (res.status == 'success') {
      const parsedData = z.array(carCampaignComment).safeParse(res.data);
      if (parsedData.success) {
        return parsedData.data;
      } else {
        return [];
      }
    }

    return [];
  } catch (error) {
    return [];
  }
}
