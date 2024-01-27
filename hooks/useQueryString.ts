'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const useQueryParam = (paramName?: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [initialValue, setInitialValue] = useState<string | null>(null);

  useEffect(() => {
    if (!paramName) return;

    const params = new URLSearchParams(searchParams);
    const paramValue = params.get(paramName);

    if (paramValue) {
      setInitialValue(paramValue);
    } else {
      setInitialValue(null);
    }
  }, [searchParams, paramName]);

  const setQueryParam = useCallback(
    (name: string, values: string | string[] | number | number[]) => {
      const params = new URLSearchParams(searchParams);

      // Clear existing values for the parameter
      params.delete(name);

      if (Array.isArray(values)) {
        values.forEach((value) => params.append(name, value.toString()));
      } else {
        params.append(name, values.toString());
      }

      // params.set(name, value);

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const resetQueryParams = useCallback(() => {
    router.push('');
  }, [router]);

  return { initialValue, setQueryParam, resetQueryParams };
};

export default useQueryParam;
