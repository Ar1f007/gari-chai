'use client';

import React, { useEffect } from 'react';
import { Checkbox } from '@nextui-org/checkbox';
import { PlusIcon } from 'lucide-react';
import useQueryParam from '@/hooks/useQueryString';

const SEAT_KEY = 'seats';

const NumberOfSeats = () => {
  const { getQueryParam, setQueryParam } = useQueryParam(SEAT_KEY);

  const seatsInUrl = getQueryParam(SEAT_KEY);

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

  useEffect(() => {
    if (!seatsInUrl) setSelectedSeats([]);
  }, [seatsInUrl]);

  useEffect(() => {
    setQueryParam('seats', selectedSeats);
  }, [selectedSeats, setQueryParam]);

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
    <div className='flex h-full flex-col items-start justify-center gap-4 overflow-hidden px-2 pb-2 pt-[2px]'>
      {getCheckboxes()}
    </div>
  );
};

export default NumberOfSeats;
