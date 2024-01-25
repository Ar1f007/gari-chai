'use client';

import React, { Fragment } from 'react';
import useGetAllAndPopularBrands from '@/hooks/useGetAllAndPopularBrands';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Spinner } from '@nextui-org/spinner';
import { BrandsWithSections } from '@/services/car/getAllAndPopularBrands';
import { Button } from '@nextui-org/button';

const Brands = () => {
  const { isLoading, brands, errMsg } = useGetAllAndPopularBrands();

  const [selected, setSelected] = React.useState('');
  const [allBrands, setAllBrands] = React.useState<BrandsWithSections['allBrands']>([]);
  const [popularBrands, setPopularBrands] = React.useState<BrandsWithSections['popularBrands']>([]);
  const [showMore, setShowMore] = React.useState(false);
  const [showMorePopularBrands, setShowMorePopularBrands] = React.useState(false);

  React.useEffect(() => {
    if (brands) {
      if (brands.popularBrands.length > 0) {
        setPopularBrands(brands.popularBrands);
      }

      if (brands.allBrands.length > 0) {
        if (brands.popularBrands.length > 0) {
          const brandsWithoutPopularOnes = brands.allBrands.filter((curBrand) => {
            const existInPopularBrand = brands.popularBrands.find(
              (popularBrand) => popularBrand._id === curBrand._id,
            );
            if (existInPopularBrand) return false;
            return true;
          });

          setAllBrands(brandsWithoutPopularOnes);
          return;
        }

        setAllBrands(brands.allBrands);
      }
    }
  }, [JSON.stringify(brands)]);

  return (
    <Fragment>
      {isLoading ? (
        <div className='text-center'>
          <Spinner label='Loading brands...' />
        </div>
      ) : errMsg ? (
        <p className='text-red-500'>{errMsg}</p>
      ) : (
        <div className='flex flex-col gap-4 overflow-hidden px-2 pb-2'>
          {brands && !!brands.popularBrands.length && (
            <div className='space-y-4'>
              <RadioGroup
                value={selected}
                onValueChange={setSelected}
                label='Popular Brands'
                classNames={{
                  wrapper: 'grid grid-cols-2 w-full',
                }}
              >
                {popularBrands.slice(0, 6).map((brand) => (
                  <Radio
                    key={brand._id}
                    value={brand.slug}
                    classNames={{
                      label: 'text-[14.5px]',
                    }}
                  >
                    {brand.name}
                  </Radio>
                ))}

                {showMorePopularBrands && (
                  <React.Fragment>
                    {popularBrands.slice(6).map((brand) => (
                      <Radio
                        key={brand._id}
                        value={brand.slug}
                        classNames={{
                          label: 'text-[14.5px]',
                        }}
                      >
                        {brand.name}
                      </Radio>
                    ))}
                  </React.Fragment>
                )}
              </RadioGroup>
              {popularBrands.length > 6 && (
                <Button
                  variant='light'
                  className='w-fit'
                  onClick={() => setShowMorePopularBrands((prev) => !prev)}
                  color='primary'
                >
                  Show {showMore ? 'Less' : 'More'}
                </Button>
              )}
            </div>
          )}

          {brands && !!brands.allBrands.length && (
            <div className='space-y-4'>
              <RadioGroup
                value={selected}
                onValueChange={setSelected}
                label='All Brands'
                classNames={{
                  wrapper: 'grid grid-cols-2 w-full',
                }}
              >
                {allBrands.slice(0, 8).map((brand) => (
                  <Radio
                    key={brand._id}
                    value={brand.slug}
                    classNames={{
                      label: 'text-[14.5px]',
                    }}
                  >
                    {brand.name}
                  </Radio>
                ))}

                {showMore && (
                  <React.Fragment>
                    {allBrands.slice(8).map((brand) => (
                      <Radio
                        key={brand._id}
                        value={brand.slug}
                        classNames={{
                          label: 'text-[14.5px]',
                        }}
                      >
                        {brand.name}
                      </Radio>
                    ))}
                  </React.Fragment>
                )}
              </RadioGroup>
              {allBrands.length > 8 && (
                <Button
                  variant='light'
                  className='w-fit'
                  onClick={() => setShowMore((prev) => !prev)}
                  color='primary'
                >
                  Show {showMore ? 'Less' : 'More'}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
export default Brands;
