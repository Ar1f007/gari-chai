import { FormEvent, useState } from 'react';

import { Radio, RadioGroup } from '@nextui-org/react';
import { Select, SelectItem, SelectSection } from '@nextui-org/select';
import { Button } from '@nextui-org/button';

import selectOptionData from '@/data/searchForm.json';
import { useRouter } from 'next/navigation';
import { createUrl } from '@/lib/utils';

type SearchBy = 'budget' | 'brand';

const selectClassNames = {
  value: 'tracking-wider text-[15px] !text-default-50',
  selectorIcon: 'text-primary-500',
  trigger:
    'data-[hover=true]:border-primary-500 data-[focus]:border-primary-500 data-[open=true]:border-primary-500',
};

export const NewCarSearchForm = () => {
  const router = useRouter();

  const [searchBy, setSearchBy] = useState<SearchBy>('budget');
  const [budget, setBudget] = useState('');
  const [bodyType, setBodyType] = useState('');

  function handleQuerySubmission(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    params.set('car', 'new');

    if (searchBy == 'budget') {
      params.set('budget', budget);
      params.set('bodyType', bodyType);
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
          >
            {selectOptionData.newCar.bodyTypes.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </>
      )}

      {searchBy == 'brand' && (
        <>
          <Select
            aria-label='Select brand'
            placeholder='Select brand'
            size='sm'
            variant='bordered'
            className='mt-8 max-w-xs'
            classNames={{
              ...selectClassNames,
            }}
          >
            <SelectSection
              showDivider
              title='Popular Brands'
              classNames={{
                heading: 'font-medium text-primary',
              }}
            >
              <SelectItem key='tata'>Tata</SelectItem>
              <SelectItem key='toyota'>Toyota</SelectItem>
              <SelectItem key='tesla'>Tesla</SelectItem>
            </SelectSection>
            <SelectSection
              title='All Brands'
              classNames={{
                heading: 'font-medium text-primary',
              }}
            >
              <SelectItem key='all-tata'>Tata</SelectItem>
              <SelectItem key='all-toyota'>Toyota</SelectItem>
              <SelectItem key='all-tesla'>Tesla</SelectItem>
            </SelectSection>
          </Select>
        </>
      )}

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
