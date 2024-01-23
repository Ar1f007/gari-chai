import React, { useEffect } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Slider, SliderValue } from '@nextui-org/slider';

import budgetData from '@/data/searchForm.json';

const Budget = () => {
  const [value, setValue] = React.useState<SliderValue>([0, 2_00_00_000]);
  const [selected, setSelected] = React.useState('');

  useEffect(() => {
    if (!selected.length) return;

    const [minValue, maxValue] = selected.split('-');
    setValue([+minValue, +maxValue]);
  }, [selected]);

  return (
    <Accordion
      variant='splitted'
      keepContentMounted
    >
      <AccordionItem
        key='1'
        aria-label='Budget'
        title='Budget'
        className='group-[.is-splitted]:shadow-small'
      >
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
            onChange={setValue}
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
      </AccordionItem>
    </Accordion>
  );
};

export default Budget;
