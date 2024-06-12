'use client';

import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { getCarModels } from '@/services/car/getCarModels';
import { searchQueryActions, searchQueryStore } from '@/store';
import { useEffect, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type UseGetCarModelsParams = {
  brandId?: string;
};

const useGetCarModels = ({ brandId }: UseGetCarModelsParams = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<Option[]>([]);

  const [errMsg, setErrMsg] = useState('');

  async function fetchCarModels(brandId?: string | undefined) {
    try {
      setIsLoading(true);

      const res = await getCarModels({ brandId: brandId });

      if (res.status === 'success') {
        const formattedVal = res.data.map((model) => ({
          value: model.name,
          label: model.name,
        }));

        setData(formattedVal ?? []);
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
    if (brandId) {
      fetchCarModels(brandId);
    }
  }, [brandId]);

  return {
    isLoading,
    data,
    errMsg,
    fetchCarModels,
  };
};
export default useGetCarModels;
