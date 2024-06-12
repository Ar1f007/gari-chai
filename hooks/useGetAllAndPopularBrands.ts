'use client';

import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { BrandsWithSections, getAllAndPopularBrands } from '@/services/car/getAllAndPopularBrands';
import { useEffect, useState } from 'react';

const useGetAllAndPopularBrands = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [brands, setBrands] = useState<BrandsWithSections | null>(null);

  const [errMsg, setErrMsg] = useState('');

  async function fetchAllAndPopularBrands() {
    try {
      setIsLoading(true);
      const res = await getAllAndPopularBrands();

      if (res.status === 'success') {
        setBrands(res.data);
        setErrMsg('');
      }

      if (res.status === 'error' || res.status === 'fail') {
        setErrMsg(res.message ?? GENERIC_ERROR_MSG);
      }
    } catch (error) {
      setErrMsg('Could not load brands, try reloading again');
      setBrands(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllAndPopularBrands();
  }, []);

  return {
    isLoading,
    brands,
    errMsg,
  };
};

export default useGetAllAndPopularBrands;
