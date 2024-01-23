'use client';

import React from 'react';
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
    <Accordion
      variant='splitted'
      keepContentMounted
    >
      <AccordionItem
        key='1'
        aria-label='Brands'
        title='Brands'
        className='group-[.is-splitted]:shadow-small'
      >
        {isLoading ? (
          <div className='text-center'>
            <Spinner label='Loading brands...' />
          </div>
        ) : errMsg ? (
          <p className='text-red-500'>{errMsg}</p>
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
                    classNames={{
                      label: 'text-[14.5px]',
                    }}
                  >
                    {brand.name}
                  </Radio>
                ))}

                {showMore && (
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

                {popularBrands.length > 6 && (
                  <Button
                    variant='light'
                    className='w-fit'
                    onClick={() => setShowMore((prev) => !prev)}
                  >
                    Show {showMore ? 'Less' : 'More'}
                  </Button>
                )}
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

                {allBrands.length > 8 && (
                  <Button
                    variant='light'
                    className='w-fit'
                    onClick={() => setShowMore((prev) => !prev)}
                  >
                    Show {showMore ? 'Less' : 'More'}
                  </Button>
                )}
              </RadioGroup>
            )}
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};
export default Brands;
