import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { HttpStatus } from '@/services';

export async function GET(request: NextRequest) {
  const secretToken = request.nextUrl.searchParams.get('revalidateSecret');

  if (secretToken !== process.env.REVALIDATE_SECRET) {
    return Response.json(
      {
        success: 'fail',
        message: 'You are not authorized',
      },
      {
        status: HttpStatus.UNAUTHORIZED,
      },
    );
  }

  const tag = request.nextUrl.searchParams.get('tag');

  if (!tag)
    return Response.json(
      {
        success: 'fail',
        message: 'No tag was found',
      },
      {
        status: HttpStatus.BAD_REQUEST,
      },
    );

  revalidateTag(tag);

  return Response.json({ success: 'success', message: 'revalidated' });
}
