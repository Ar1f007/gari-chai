import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { HttpStatus } from '@/services';
import { z } from 'zod';

const RevalidateParamsSchema = z.object({
  tags: z.array(z.string()),
  paths: z.array(
    z.object({
      path: z.string(),
      type: z.enum(['layout', 'page']).optional(),
    }),
  ),
});

export async function POST(request: NextRequest) {
  try {
    const secretToken = request.nextUrl.searchParams.get('revalidateSecret');

    const requestOrigin = request.headers.get('Origin');

    if (secretToken !== process.env.REVALIDATE_SECRET) {
      return Response.json(
        {
          success: 'fail',
          message: 'You are not authorized',
        },
        {
          status: HttpStatus.FORBIDDEN,
        },
      );
    }

    const data = await request.json();

    const parsedData = RevalidateParamsSchema.safeParse(data);

    if (!parsedData.success) {
      return Response.json(
        {
          success: 'fail',
          message: "Invalid data structure. Valid Ex: {tags: ['tag']} { paths: ['/path']}",
        },
        {
          status: HttpStatus.BAD_REQUEST,
        },
      );
    }

    parsedData.data.tags.forEach((tag) => revalidateTag(tag));
    parsedData.data.paths.forEach((path) => revalidatePath(path.path, path.type));

    let allowedOrigin;

    if (
      requestOrigin === process.env.ALLOWED_ORIGIN_1! ||
      requestOrigin === process.env.ALLOWED_ORIGIN_2! ||
      requestOrigin === process.env.ALLOWED_ORIGIN_3!
    ) {
      allowedOrigin = requestOrigin;
    } else {
      allowedOrigin = process.env.DEFAULT_ALLOWED_ORIGIN!;
    }

    const responseHeaders = new Headers({
      'Access-Control-Allow-Methods': 'GET, DELETE, PATCH, POST, PUT',
      'Access-Control-Allow-Headers':
        'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date',
      'Access-Control-Allow-Origin': allowedOrigin,
    });

    return Response.json(
      { success: 'success', message: 'revalidated' },
      {
        status: HttpStatus.OK,
        headers: responseHeaders,
      },
    );
  } catch (error) {
    return Response.json(
      {
        success: 'error',
        message: (error as any)?.message ?? 'Something went wrong',
      },
      {
        status: HttpStatus.SERVER_ERROR,
      },
    );
  }
}
