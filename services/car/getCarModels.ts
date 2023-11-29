import { z } from 'zod';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { brandModelSchema } from '@/schema/brand-and-model';

type TCarModel = z.infer<typeof brandModelSchema>;

type CarModelsParams = {
  brandId?: string;
};

export async function getCarModels({ brandId }: CarModelsParams = {}) {
  const url = endpoints.api.models.baseUrl;

  let path = url;

  if (brandId) {
    path += '/' + brandId;
  }

  return apiFetch<TCarModel[]>(path, {
    method: ReqMethod.GET,
    cache: 'no-store',
  });
}
