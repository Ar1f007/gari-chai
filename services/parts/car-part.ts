import { z } from 'zod';

import { createUrl } from '@/lib/utils';
import { endpoints } from '../endpoints';
import { apiFetch } from '../apiFetch';
import { ReqMethod } from '../serviceHelper';
import { TCarPartSchema, carPartSchema } from '@/schema/car-part';
import { TPagination } from '@/types';

type CarPartsResponseData = {
  results: TCarPartSchema[];
  pagination: TPagination;
};

export const carPartsService = {
  getPartList: async (queryParams: URLSearchParams) => {
    try {
      if (!queryParams.has('limit')) {
        queryParams.append('limit', '12');
      }

      const url = createUrl(endpoints.api.parts.carParts, queryParams);

      const res = await apiFetch<CarPartsResponseData>(url, {
        method: ReqMethod.GET,
        cache: 'no-cache',
      });

      if (!res) {
        throw new Error('Something went wrong');
      }

      if (res.status !== 'success') {
        throw new Error(res.message);
      }

      const parsedData = z.array(carPartSchema).safeParse(res.data.results);

      if (parsedData.success) {
        return {
          data: {
            carParts: parsedData.data,
            pagination: res.data.pagination,
          },
          message: null,
        };
      }

      throw new Error('ERROR! Part Data Missing');
    } catch (err) {
      if (err instanceof Error) {
        return {
          data: null,
          message: err.message,
        };
      }

      return {
        data: null,
        message: 'Something went wrong!',
      };
    }
  },
  getPartDetails: async ({ slug }: { slug: string }) => {
    try {
      if (!slug) throw new Error('Slug is required');

      const url = endpoints.api.parts.carParts + '/' + slug;

      const res = await apiFetch(url, {
        method: ReqMethod.GET,
        cache: 'no-cache',
      });

      if (!res) {
        throw new Error('Something went wrong!');
      }

      if (res.status !== 'success') {
        return {
          data: null,
          message: res.message,
        };
      }

      const parsedData = carPartSchema.safeParse(res.data);

      if (parsedData.success) {
        return {
          data: parsedData.data,
          message: null,
        };
      }

      throw new Error('ERROR! Data Missing');
    } catch (error) {
      return {
        data: null,
        message: error instanceof Error ? error.message : 'Something went wrong',
      };
    }
  },
};
