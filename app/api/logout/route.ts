import { AUTH_TOKEN_NAME } from '@/lib/constants';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    cookies().delete(AUTH_TOKEN_NAME);

    return Response.json({
      status: 'success',
    });
  } catch (error) {
    return Response.json({
      status: 'fail',
    });
  }
}
