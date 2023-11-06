import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';

type TGetCarReviewPayload = {
  carId: string;
};
export async function getCarReview(payload: TGetCarReviewPayload) {
  try {
    const url = endpoints.api.cars.getReviews + '/' + payload.carId;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,
    });

    if (res.status === 'success') {
      return res.data;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}
