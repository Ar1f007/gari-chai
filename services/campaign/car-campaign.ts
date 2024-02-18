import { z } from 'zod';
import { apiFetch } from '../apiFetch';
import { ReqMethod } from '../serviceHelper';
import { endpoints } from '../endpoints';
import { TCarCampaign, carCampaignSchema } from '@/schema/campaign';

type GetCarsCampaignParams = {
  status: 'active' | 'hidden';
};
export async function getCarsCampaign({ status = 'active' }: Partial<GetCarsCampaignParams> = {}) {
  try {
    const url = endpoints.api.campaigns.cars + `?status=${status}`;

    const res = await apiFetch<TCarCampaign[]>(url, {
      method: ReqMethod.GET,
      next: {
        revalidate: 0,
      },
    });

    if (res.status == 'success') {
      const parsedData = z.array(carCampaignSchema).safeParse(res.data);

      if (parsedData.success) {
        return {
          message: '',
          data: parsedData.data,
        };
      } else {
        return {
          data: null,
          message: 'Invalid Input',
        };
      }
    }

    return {
      data: null,
      message: res.message || 'Something went wrong',
    };
  } catch (error) {
    return {
      data: null,
      message: 'Something went wrong',
    };
  }
}
