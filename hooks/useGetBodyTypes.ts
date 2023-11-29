'use client';

import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { getCarBodyTypes } from '@/services/car/getBodyTypes';
import { useEffect, useState } from 'react';

type BodyType = {
  value: string;
  label: string;
};

const useGetBodyTypes = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);

  const [errMsg, setErrMsg] = useState('');

  async function fetchCarBodyTypes() {
    try {
      setIsLoading(true);
      const res = await getCarBodyTypes();

      if (res.status === 'success') {
        const formattedVal = res.data.map((bodyType) => ({
          value: bodyType.slug,
          label: bodyType.name,
        }));

        setBodyTypes(formattedVal ?? []);
        setErrMsg('');
      }

      if (res.status === 'error' || res.status === 'fail') {
        setErrMsg(res.message ?? GENERIC_ERROR_MSG);
      }
    } catch (error) {
      setErrMsg('Could not load body types, try reloading again');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCarBodyTypes();
  }, []);

  return {
    isLoading,
    bodyTypes,
    errMsg,
  };
};
export default useGetBodyTypes;
