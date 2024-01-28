import { z } from 'zod';

import { TCarSchema, carSchema } from '@/schema/car';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { TPagination } from '@/types';
import { createUrl } from '@/lib/utils';

type GetCarsResponseData = {
  results: TCarSchema[];
  pagination: TPagination;
};

export async function getCars(queryParams: URLSearchParams) {
  try {
    if (!queryParams.has('limit')) {
      queryParams.append('limit', '12');
    }

    const url = createUrl(endpoints.api.cars.newCarBaseUrl, queryParams);

    const res = await apiFetch<GetCarsResponseData>(url, {
      method: ReqMethod.GET,
      cache: 'no-store',
    });

    if (res.status !== 'success') {
      throw new Error(res.message);
    }

    const parsedData = z.array(carSchema).safeParse(res.data.results);

    if (parsedData.success) {
      return {
        cars: parsedData.data,
        pagination: res.data.pagination,
      };
    }

    throw new Error('ERROR! Car data missing');
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return err.message;
    }

    return 'Something went wrong!';
  }
}
