import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { TAuthBasicUserInfo, userBasicInfoAPIResponseSchema } from '@/schema/user';

type ProfileParams = {
  options?: {
    signal: AbortSignal;
  };
};
export async function profile(params: ProfileParams = {}) {
  try {
    const res = await apiFetch<TAuthBasicUserInfo>(endpoints.api.users.profile, {
      method: ReqMethod.GET,
      cache: 'no-store',
      ...params.options,
    });

    if (res.status === 'success') {
      const parsedData = userBasicInfoAPIResponseSchema.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
