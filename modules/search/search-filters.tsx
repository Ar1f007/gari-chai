'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useState } from 'react';
import Budget from '@/modules/search/filters/budget';
import Brands from './filters/brands';
import Models from './filters/models';
import BodyStyles from './filters/body-styles';
import NumberOfSeats from './filters/seats';
import FuelTypes from './filters/fuel-type';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { ListRestartIcon, SlidersHorizontalIcon } from 'lucide-react';
import { Selection } from '@nextui-org/react';
import { isMobile } from 'react-device-detect';

const ALL_FILTER_KEYS = ['1', '2', '3', '4', '5', '6'];

export const SearchFilters = () => {
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    isMobile ? new Set([]) : new Set(ALL_FILTER_KEYS),
  );

  function handleExpandCollapseFilters() {
    const keys = (selectedKeys as Set<string>).size === 0 ? new Set(ALL_FILTER_KEYS) : new Set([]);

    setSelectedKeys(keys);
  }

  const filters = (
    <Accordion
      variant='splitted'
      keepContentMounted
      selectionMode='multiple'
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      className='px-1'
    >
      <AccordionItem
        key='1'
        aria-label='Budget'
        title='Budget'
        className='group-[.is-splitted]:px-3 group-[.is-splitted]:shadow-small'
        classNames={{
          content: 'overflow-x-hidden',
        }}
      >
        <Budget />
      </AccordionItem>

      <AccordionItem
        key='2'
        aria-label='Brands'
        title='Brands'
        className='group-[.is-splitted]:px-3 group-[.is-splitted]:shadow-small'
        classNames={{
          content: 'overflow-x-hidden',
        }}
      >
        <Brands />
      </AccordionItem>

      <AccordionItem
        key='3'
        aria-label='Models'
        title='Models'
        className='group-[.is-splitted]:px-3 group-[.is-splitted]:shadow-small'
        classNames={{
          content: 'overflow-x-hidden',
        }}
      >
        <Models />
      </AccordionItem>

      <AccordionItem
        key='4'
        aria-label='Body Styles'
        title='Body Styles'
        className='group-[.is-splitted]:px-3 group-[.is-splitted]:shadow-small'
        classNames={{
          content: 'overflow-x-hidden',
        }}
      >
        <BodyStyles />
      </AccordionItem>

      <AccordionItem
        key='5'
        aria-label='Seats'
        title='Seats'
        className='group-[.is-splitted]:px-3 group-[.is-splitted]:shadow-small'
        classNames={{
          content: 'overflow-x-hidden',
        }}
      >
        <NumberOfSeats />
      </AccordionItem>

      <AccordionItem
        key='6'
        aria-label='Fuel Type'
        title='Fuel Type'
        className='group-[.is-splitted]:px-3 group-[.is-splitted]:shadow-small'
        classNames={{
          content: 'overflow-x-hidden',
        }}
      >
        <FuelTypes />
      </AccordionItem>
    </Accordion>
  );

  const buttons = (
    <div className='flex justify-between gap-2 px-2'>
      <Button
        variant='bordered'
        onClick={handleExpandCollapseFilters}
        startContent={<SlidersHorizontalIcon className='size-[16px]' />}
        className='text-xs font-medium uppercase text-foreground'
      >
        {(selectedKeys as Set<string>).size === 0 ? 'Expand' : 'Collapse'} all filters
      </Button>
      <Button
        variant='bordered'
        onClick={() => {
          router.push('/search');
        }}
        className='text-xs font-medium uppercase text-foreground'
        startContent={<ListRestartIcon className='size-[18px]' />}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <Suspense>
      <div className='space-y-5'>
        {!isMobile && buttons}

        {isMobile ? (
          <Accordion
            variant='splitted'
            keepContentMounted
            className='max-w-full px-0'
          >
            <AccordionItem
              key='0'
              aria-label='Filters'
              title='Filters'
              className='group-[.is-splitted]:px-3 group-[.is-splitted]:shadow-small'
              classNames={{
                content: 'overflow-x-hidden',
              }}
            >
              <div className='mb-5'>{buttons}</div>
              {filters}
            </AccordionItem>
          </Accordion>
        ) : (
          filters
        )}
      </div>
    </Suspense>
  );
};
