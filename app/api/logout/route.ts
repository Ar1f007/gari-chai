import { routes } from '@/config/routes';
import { AUTH_TOKEN_NAME } from '@/lib/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  try {
    cookies().delete(AUTH_TOKEN_NAME);

    redirect(routes.home);
  } catch (error) {
    return Response.json({
      status: 'fail',
    });
  }
}
