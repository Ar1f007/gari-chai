import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { TAuthUser, userAPIResponseSchema } from '@/schema/user';

export async function me() {
  try {
    const res = await apiFetch<TAuthUser>(endpoints.api.users.me, {
      method: ReqMethod.GET,
      cache: 'no-store',
    });

    if (res.status === 'success') {
      const parsedData = userAPIResponseSchema.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
