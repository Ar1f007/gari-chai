'use client';

import React from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Slider, SliderValue } from '@nextui-org/slider';

import budgetData from '@/data/searchForm.json';
import debounce from 'debounce';
import useQueryParam from '@/hooks/useQueryString';

// TODO
// FIX API BEING CALLED MULTIPLE TIMES
// SET INITIAL VALUE FROM QUERY PARAMS

const BUDGET_KEY = 'budget';
const DEFAULT_RANGE_VALUE = [0, 2_00_00_000];

const Budget = () => {
  const { getQueryParam, setQueryParam } = useQueryParam();
  const budgetValInUrl = getQueryParam(BUDGET_KEY);

  const [value, setValue] = React.useState<SliderValue>(DEFAULT_RANGE_VALUE);
  const [selected, setSelected] = React.useState('');
  const [userInteracted, setUserInteracted] = React.useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false);

  function updateUrlQuery(value: SliderValue | string) {
    if (isRequestInProgress) {
      return; // Skip making additional requests while one is in progress
    }

    setIsRequestInProgress(true);
    const budget = Array.isArray(value) ? value.join('-') : value + '';
    setQueryParam('budget', budget);
    setIsRequestInProgress(false);
  }

  function findAndUpdateRadioGroupVal(value: SliderValue) {
    if (Array.isArray(value)) {
      const val = value.join('-');

      const existInBudgetDataArr = budgetData.newCar.filterBudgets.find(
        (budget) => budget.value === val,
      );

      if (existInBudgetDataArr) {
        setSelected(val);
      } else {
        setSelected('');
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateUrlQueryDebounced = React.useMemo(() => debounce(updateUrlQuery, 500), []);

  const updateSelectValue = React.useMemo(() => debounce(findAndUpdateRadioGroupVal, 500), []);

  React.useEffect(() => {
    if (!budgetValInUrl) {
      setSelected('');
      setValue(DEFAULT_RANGE_VALUE);
    }
  }, [budgetValInUrl]);

  React.useEffect(() => {
    if (!selected.length) return;

    const [minValue, maxValue] = selected.split('-');
    setValue([+minValue, +maxValue]);

    updateUrlQuery(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  React.useEffect(() => {
    if (userInteracted) {
      updateUrlQueryDebounced(value);
    }

    updateSelectValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, updateUrlQueryDebounced, userInteracted]);

  const handleSliderChange = (newValue: SliderValue) => {
    setUserInteracted(true);
    setValue(newValue);
  };

  return (
    <div className='flex h-full flex-col items-start justify-center gap-4 overflow-hidden px-2 pb-2'>
      <Slider
        label='Select a budget'
        formatOptions={{
          style: 'currency',
          currency: 'BDT',
          maximumSignificantDigits: 3,
        }}
        step={100_000}
        maxValue={2_00_00_000}
        minValue={0}
        value={value}
        onChange={handleSliderChange}
      />

      <div className='flex flex-col gap-3'>
        <RadioGroup
          label='What is your price range?'
          value={selected}
          onValueChange={setSelected}
        >
          {budgetData.newCar.filterBudgets.map((budget, idx) => (
            <Radio
              key={idx}
              value={budget.value}
              classNames={{
                label: 'text-[14.5px]',
              }}
            >
              {budget.label}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Budget;
