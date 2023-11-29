'use client';

import { FormEvent, useState } from 'react';

import { Radio, RadioGroup } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import SelectBrand from './new-car/select-brand';

import useGetBodyTypes from '@/hooks/useGetBodyTypes';
import useGetAllAndPopularBrands from '@/hooks/useGetAllAndPopularBrands';

import selectOptionData from '@/data/searchForm.json';
import { createUrl } from '@/lib/utils';
import SelectBrandAndModel from './new-car/SelectBrandAndModel';

type SearchBy = 'budget' | 'brand';

export const selectClassNames = {
  value: 'tracking-wider text-[15px] !text-default-50',
  selectorIcon: 'text-primary-500',
  trigger:
    'data-[hover=true]:border-primary-500 data-[focus]:border-primary-500 data-[open=true]:border-primary-500',
};

export const NewCarSearchForm = () => {
  const { isLoading, bodyTypes, errMsg } = useGetBodyTypes();

  const router = useRouter();

  const [searchBy, setSearchBy] = useState<SearchBy>('budget');
  const [budget, setBudget] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [brand, setBrand] = useState('');

  function handleQuerySubmission(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    params.set('car', 'new');

    if (searchBy == 'budget') {
      params.set('budget', budget);
      params.set('bodyType', bodyType);
    }

    if (searchBy === 'brand') {
      params.set('brand', brand);
    }

    router.push(createUrl('/search', params));
  }

  return (
    <form onSubmit={handleQuerySubmission}>
      <RadioGroup
        orientation='horizontal'
        classNames={{ wrapper: 'justify-around' }}
        color='primary'
        className='mt-4'
        value={searchBy}
        onValueChange={(v) => setSearchBy(v as SearchBy)}
      >
        <Radio
          value='budget'
          classNames={{ label: 'font-medium text-white' }}
        >
          By Budget
        </Radio>

        <Radio
          value='brand'
          classNames={{ label: 'font-medium text-white' }}
        >
          By Brand
        </Radio>
      </RadioGroup>

      {searchBy == 'budget' && (
        <>
          <Select
            aria-label='Select budget'
            placeholder='Select budget'
            variant='bordered'
            color='primary'
            size='sm'
            disableAnimation
            isRequired
            onChange={(e) => setBudget(e.target.value)}
            className='mt-8 max-w-xs'
            classNames={selectClassNames}
          >
            {selectOptionData.newCar.budgets.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            aria-label='Select body type'
            placeholder='Select body type'
            color='primary'
            variant='bordered'
            size='sm'
            disableAnimation
            isRequired
            onChange={(e) => setBodyType(e.target.value)}
            className='mt-4 max-w-xs'
            classNames={selectClassNames}
            isLoading={isLoading}
            items={bodyTypes}
            errorMessage={errMsg ? errMsg : ''}
          >
            {(item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            )}
          </Select>
        </>
      )}

      {searchBy == 'brand' && <SelectBrandAndModel />}

      <Button
        type='submit'
        fullWidth
        className='mt-6 text-[15px] uppercase tracking-wider text-default-50'
        variant='solid'
        color='primary'
      >
        Search
      </Button>
    </form>
  );
};
