'use server';

import { revalidateTag } from 'next/cache';

export async function invalidateTags(payload: string | string[]) {
  const tags = typeof payload === 'string' ? [payload] : payload;

  tags.forEach((tag) => revalidateTag(tag));
}
