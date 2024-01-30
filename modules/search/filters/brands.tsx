'use client';

import * as React from 'react';
import { Button } from '@nextui-org/button';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Spinner } from '@nextui-org/spinner';

import { BrandsWithSections } from '@/services/car/getAllAndPopularBrands';
import useGetAllAndPopularBrands from '@/hooks/useGetAllAndPopularBrands';
import useQueryParam from '@/hooks/useQueryString';

const Brands = () => {
  const { isLoading, brands, errMsg } = useGetAllAndPopularBrands();

  const { initialValue, setQueryParam } = useQueryParam('brand');

  const [allBrands, setAllBrands] = React.useState<BrandsWithSections['allBrands']>([]);
  const [popularBrands, setPopularBrands] = React.useState<BrandsWithSections['popularBrands']>([]);
  const [showMore, setShowMore] = React.useState(false);
  const [showMorePopularBrands, setShowMorePopularBrands] = React.useState(false);
  const [_pending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (brands) {
      const { popularBrands: pb, allBrands: ab } = brands;
      if (pb.length > 0) {
        setPopularBrands(pb);
      }

      if (ab.length > 0) {
        const brandsWithoutPopularOnes = ab.filter(
          (curBrand) => !pb.find((popularBrand) => popularBrand._id === curBrand._id),
        );
        setAllBrands(brandsWithoutPopularOnes);
      }
    }
  }, [brands]);

  const renderRadioGroup = (
    label: string,
    brandsList: BrandsWithSections['popularBrands' | 'allBrands'],
    showMoreState: boolean,
    setShowMoreState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => (
    <div className='space-y-4'>
      <RadioGroup
        value={initialValue || ''}
        onValueChange={(value) => {
          startTransition(() => {
            setQueryParam('brand', value);
          });
        }}
        label={label}
        classNames={{ wrapper: 'grid grid-cols-2 w-full' }}
      >
        {brandsList.slice(0, showMoreState ? undefined : 6).map((brand) => (
          <Radio
            key={brand._id}
            value={brand.name}
            classNames={{ label: 'text-[14.5px]' }}
          >
            {brand.name}
          </Radio>
        ))}
      </RadioGroup>
      {brandsList.length > 6 && (
        <Button
          variant='light'
          className='w-fit'
          onClick={() => setShowMoreState((prev) => !prev)}
          color='primary'
        >
          Show {showMoreState ? 'Less' : 'More'}
        </Button>
      )}
    </div>
  );

  return (
    <React.Fragment>
      {isLoading ? (
        <div className='text-center'>
          <Spinner label='Loading brands...' />
        </div>
      ) : errMsg ? (
        <p className='text-red-500'>{errMsg}</p>
      ) : (
        <div className='flex flex-col gap-4 overflow-hidden px-2 pb-2'>
          {brands &&
            brands.popularBrands?.length > 0 &&
            renderRadioGroup(
              'Popular Brands',
              popularBrands,
              showMorePopularBrands,
              setShowMorePopularBrands,
            )}

          {brands &&
            brands.allBrands?.length > 0 &&
            renderRadioGroup('All Brands', allBrands, showMore, setShowMore)}
        </div>
      )}
    </React.Fragment>
  );
};
export default Brands;
