'use client';

import { FormEvent, useState } from 'react';

import { Radio, RadioGroup } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { createUrl } from '@/lib/utils';
import SelectBrandAndModel from './new-car/SelectBrandAndModel';
import SelectBudgetAndBodyType from './new-car/select-budget-and-bodyType';
import { useSnapshot } from 'valtio';
import { searchQueryStore } from '@/store';
import { toast } from 'sonner';

type SearchBy = 'budget' | 'brand';

export const selectClassNames = {
  value: 'tracking-wider text-[15px] !text-default-50',
  selectorIcon: 'text-primary-500',
  trigger:
    'data-[hover=true]:border-primary-500 data-[focus]:border-primary-500 data-[open=true]:border-primary-500',
};

export const NewCarSearchForm = () => {
  const searchQuerySnap = useSnapshot(searchQueryStore);

  const [searchBy, setSearchBy] = useState<SearchBy>('budget');

  const router = useRouter();

  function handleQuerySubmission(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    params.set('car', 'new');

    if (searchBy == 'budget') {
      params.set('budget', searchQuerySnap.newCar.byBudget.budget);
      params.set('bodyType', searchQuerySnap.newCar.byBudget.bodyType);
    }

    if (searchBy === 'brand') {
      params.set('brand', searchQuerySnap.newCar.byBrand.brand);

      const modelName = searchQuerySnap.newCar.byBrand.model;

      if (modelName.length) {
        params.set('model', modelName);
      }
    }

    params.set('page', '1');
    params.set('limit', '20');

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

      <div className='mt-8 flex flex-col gap-4'>
        {searchBy == 'budget' && <SelectBudgetAndBodyType />}

        {searchBy == 'brand' && <SelectBrandAndModel />}
      </div>

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
