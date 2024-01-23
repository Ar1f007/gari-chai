'use client';

import useGetAllAndPopularBrands from '@/hooks/useGetAllAndPopularBrands';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import React, { Fragment, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Spinner } from '@nextui-org/spinner';
import { BrandsWithSections } from '@/services/car/getAllAndPopularBrands';

const Brands = () => {
  const { isLoading, brands, errMsg } = useGetAllAndPopularBrands();

  const [selected, setSelected] = React.useState('');
  const [allBrands, setAllBrands] = React.useState<BrandsWithSections['allBrands']>([]);
  const [popularBrands, setPopularBrands] = React.useState<BrandsWithSections['popularBrands']>([]);

  useEffect(() => {
    if (brands) {
      if (brands.popularBrands.length > 0) {
        setPopularBrands(brands.popularBrands);
      }

      if (brands.allBrands.length > 0) {
        setAllBrands(brands.allBrands);
      }
    }
  }, [JSON.stringify(brands)]);

  return (
    <Accordion variant='splitted'>
      <AccordionItem
        key='1'
        aria-label='Brands'
        title='Brands'
      >
        {isLoading ? (
          <Spinner />
        ) : errMsg ? (
          <p>{errMsg}</p>
        ) : (
          <div className='flex flex-col gap-4 overflow-hidden px-2 pb-2'>
            {brands && !!brands.popularBrands.length && (
              <RadioGroup
                value={selected}
                onValueChange={setSelected}
                label='Popular Brands'
              >
                {popularBrands.slice(0, 6).map((brand) => (
                  <Radio
                    key={brand._id}
                    value={brand.slug}
                  >
                    {brand.name}
                  </Radio>
                ))}
              </RadioGroup>
            )}

            {brands && !!brands.allBrands.length && (
              <RadioGroup
                value={selected}
                onValueChange={setSelected}
                label='All Brands'
              >
                {allBrands.slice(0, 8).map((brand) => (
                  <Radio
                    key={brand._id}
                    value={brand.slug}
                  >
                    {brand.name}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};
export default Brands;
