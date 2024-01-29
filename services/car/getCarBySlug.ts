import { carSchema } from '@/schema/car';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { delay } from '@/lib/utils';

type TGetCarBySlugPayload = {
  slug: string;
  carType: 'new-car' | 'used-car';
};
export async function getCarBySlug(payload: TGetCarBySlugPayload) {
  try {
    const url =
      payload.carType === 'new-car'
        ? endpoints.api.cars.newCarBaseUrl
        : endpoints.api.cars.usedCarBaseUrl;

    const res = await apiFetch(url + '/' + payload.slug, {
      method: ReqMethod.GET,
      next: {
        revalidate: 0,
      },
    });

    if (res.status === 'success') {
      const parsedData = carSchema.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}
