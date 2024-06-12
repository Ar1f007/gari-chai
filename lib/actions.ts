'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function invalidateTags(payload: string | string[]) {
  const tags = typeof payload === 'string' ? [payload] : payload;

  tags.forEach((tag) => revalidateTag(tag));
}

type InvalidatePathParams = {
  path: string;
  type?: 'layout' | 'page';
}[];
export async function invalidatePath(paths: InvalidatePathParams) {
  for (let i = 0; i < paths.length; i++) {
    revalidatePath(paths[i].path, paths[i].type);
  }
}
