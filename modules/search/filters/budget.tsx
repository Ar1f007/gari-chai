import React, { useEffect } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Slider, SliderValue } from '@nextui-org/slider';

import budgetData from '@/data/searchForm.json';
import { formatRangeToLakhCrore } from '@/lib/utils';

const Budget = () => {
  const [value, setValue] = React.useState<SliderValue>([0, 2_00_00_000]);
  const [selected, setSelected] = React.useState('');

  useEffect(() => {
    if (!selected.length) return;

    const [minValue, maxValue] = selected.split('-');
    setValue([+minValue, +maxValue]);
  }, [selected]);

  return (
    <Accordion variant='splitted'>
      <AccordionItem
        key='1'
        aria-label='Budget'
        title='Budget'
      >
        <div className='flex h-full w-full max-w-md flex-col items-start justify-center gap-2'>
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
            className='max-w-md'
          />

          <div className='flex flex-col gap-3'>
            <RadioGroup
              label='What is your price range'
              value={selected}
              onValueChange={setSelected}
            >
              {budgetData.newCar.budgets.map((budget, idx) => (
                <Radio
                  key={idx}
                  value={budget.value}
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
