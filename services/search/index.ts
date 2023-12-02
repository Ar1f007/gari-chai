import { createUrl } from '@/lib/utils';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { TCarSchema } from '@/schema/car';

type TFetchFilteredCarsResponse = {
  results: TCarSchema[];
};

export async function fetchFilteredCars(queryParams: URLSearchParams | ReadonlyURLSearchParams) {
  try {
    const url = createUrl(endpoints.api.search.baseUrl, queryParams);

    return apiFetch<TFetchFilteredCarsResponse>(url, {
      method: ReqMethod.GET,
      cache: 'no-store',
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Something went wrong';
  }
}
