import { routes } from '@/config/routes';
import { API_V1_URL } from '@/lib/constants';
import { TApiData, TApiError } from '@/types';
import { redirect } from 'next/navigation';

type FetchExtendedOptions = {
  isFormData?: boolean;
  body?: any;
  baseApiUrl?: string;
} & Omit<RequestInit, 'body'>;

export async function apiFetch<Data = unknown, ErrData = TApiError>(
  endpoint: string,
  options: FetchExtendedOptions,
) {
  const { isFormData = false, baseApiUrl = API_V1_URL, body, headers, ...rest } = options;

  const abortController = new AbortController();

  const fetchOptions: FetchExtendedOptions = {
    headers: {
      Accept: 'application/json',
      'Content-type': isFormData ? 'multipart/form-data' : 'application/json',
      ...headers,
    },
    body: isFormData ? constructFormData(body) : JSON.stringify(body),
    credentials: 'include',
    signal: abortController.signal,
    ...rest,
  };

  try {
    const url = baseApiUrl + endpoint;
    const res = await fetch(url, fetchOptions);

    const jsonRes: TApiData<Data> | ErrData = await res.json();

    return jsonRes;
  } catch (e: any) {
    console.log({ e });
    throw e;
  }
}

function constructFormData(body: BodyInit | null | undefined) {
  if (!body) {
    return null;
  }

  const fd = new FormData();

  Object.keys(body).forEach((key) => {
    fd.append(key, body[key as keyof typeof body]);
  });

  return fd;
}
