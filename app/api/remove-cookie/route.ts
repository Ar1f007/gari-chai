import { HttpStatus } from '@/services';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { tokenName } = await req.json();

  if (!tokenName) {
    return Response.json(
      {
        status: 'fail',
        message: 'Invalid token name',
      },
      {
        status: HttpStatus.BAD_REQUEST,
      },
    );
  }

  try {
    cookies().set({
      name: tokenName,
      value: '',
      maxAge: 0,
    });

    return Response.json(
      {
        status: 'success',
        message: 'Cookie was removed',
      },
      {
        status: HttpStatus.OK,
      },
    );
  } catch (error) {
    return Response.json(
      {
        status: 'fail',
      },
      {
        status: HttpStatus.BAD_REQUEST,
      },
    );
  }
}
