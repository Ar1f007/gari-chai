import { createUrl } from '@/lib/utils';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { TCarSchema } from '@/schema/car';

type TFetchFilteredCarsResponse = {
  results: TCarSchema[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    nextPage: number | null;
  };
};

export async function fetchFilteredCars(queryParams: URLSearchParams | ReadonlyURLSearchParams) {
  try {
    if (!queryParams.toString().length) {
      return 'Find cars by filtering or type something on the search bar';
    }

    if (!queryParams.has('car')) {
      queryParams.append('car', 'new');
    }

    const url = createUrl(endpoints.api.search.baseUrl, queryParams);

    return apiFetch<TFetchFilteredCarsResponse>(url, {
      method: ReqMethod.GET,
      cache: 'no-store',
    });
  } catch (error) {
    if (error instanceof Error) {
      return process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message;
    }

    return 'Something went wrong';
  }
}
