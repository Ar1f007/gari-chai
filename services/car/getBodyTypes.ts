import { z } from 'zod';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { TAGS } from '../tags';
import { carBodyTypeSchema } from '@/schema/brand-and-model';

type BodyTypesResponse = z.infer<typeof carBodyTypeSchema>;

export async function getCarBodyTypes() {
  const url = endpoints.api.cars.info.bodyTypes;

  return apiFetch<BodyTypesResponse[]>(url, {
    method: ReqMethod.GET,
    next: {
      tags: [TAGS.carBodyTypes],
      revalidate: 3600 * 12, // every 12 hour
    },
  });
}
