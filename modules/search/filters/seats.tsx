'use client';

import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Checkbox } from '@nextui-org/checkbox';
import { PlusIcon } from 'lucide-react';

const NumberOfSeats = () => {
  const [selectedSeats, setSelectedSeats] = React.useState<number[]>([]);

  function toggleSeatSelection(seatNumber: number) {
    const isSelected = selectedSeats.includes(seatNumber);
    if (isSelected) {
      // Remove the seat if it's already selected
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Add the seat if it's not selected
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }

  function getCheckboxes() {
    return (
      <div className='grid w-full grid-cols-2 gap-2'>
        {[2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Checkbox
            multiple
            key={item}
            icon={<PlusIcon color='white' />}
            color='primary'
            isSelected={selectedSeats.includes(item)}
            data-value={item}
            onValueChange={() => {
              toggleSeatSelection(item);
            }}
            classNames={{
              label: 'text-[15px]',
            }}
          >
            {item} seats
          </Checkbox>
        ))}
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
        aria-label='Seats'
        title='Seats'
        className='group-[.is-splitted]:shadow-small'
      >
        <div className='flex h-full flex-col items-start justify-center gap-4 overflow-hidden px-2 pb-2'>
          {getCheckboxes()}
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default NumberOfSeats;
