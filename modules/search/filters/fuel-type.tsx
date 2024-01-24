'use client';

import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Checkbox } from '@nextui-org/checkbox';
import { Button } from '@nextui-org/button';

import { PlusIcon } from 'lucide-react';

import fuelData from '@/data/index.json';

type Fuel = { value: { fuelType: string; fullForm: string }; label: string };

const FuelTypes = () => {
  const [selectedFuels, setSelectedFuels] = React.useState<Fuel[]>([]);
  const [showMore, setShowMore] = React.useState(false);

  function toggleSeatSelection(fuelType: Fuel) {
    const isSelected = selectedFuels.some(
      (fuel) => fuel.value.fuelType === fuelType.value.fuelType,
    );
    if (isSelected) {
      // Remove the fuel if it's already selected
      setSelectedFuels(
        selectedFuels.filter((fuel) => fuel.value.fuelType !== fuelType.value.fuelType),
      );
    } else {
      // Add the fuel if it's not selected
      setSelectedFuels([...selectedFuels, fuelType]);
    }
  }

  function getCheckboxes() {
    return (
      <div className='flex flex-col gap-4'>
        {fuelData.fuelOptions.slice(0, 6).map((item) => (
          <Checkbox
            key={item.value.fuelType}
            multiple
            icon={<PlusIcon color='white' />}
            color='primary'
            isSelected={selectedFuels.some((fuel) => fuel.value.fuelType === item.value.fuelType)}
            onValueChange={() => {
              toggleSeatSelection(item);
            }}
            classNames={{
              label: 'text-[14.5px]',
            }}
          >
            {item.label}
          </Checkbox>
        ))}

        {showMore &&
          fuelData.fuelOptions.slice(6).map((item) => (
            <Checkbox
              multiple
              key={item.value.fuelType}
              icon={<PlusIcon color='white' />}
              color='primary'
              isSelected={selectedFuels.some((fuel) => fuel.value.fuelType === item.value.fuelType)}
              onValueChange={() => {
                toggleSeatSelection(item);
              }}
              classNames={{
                label: 'text-[14.5px]',
              }}
            >
              {item.label}
            </Checkbox>
          ))}

        {fuelData.fuelOptions.length > 6 && (
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
    );
  }

  return (
    <Accordion
      variant='splitted'
      keepContentMounted
    >
      <AccordionItem
        key='1'
        aria-label='Fuel Type'
        title='Fuel Type'
        className='group-[.is-splitted]:shadow-small'
      >
        <div className='flex h-full flex-col items-start justify-center gap-4 overflow-hidden px-2 pb-2'>
          {getCheckboxes()}
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FuelTypes;
