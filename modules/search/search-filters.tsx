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

export const SearchFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedKeys, setSelectedKeys] = useState('');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const resetQueryPath = useCallback(() => {
    const params = new URLSearchParams();
    params.set('query', '');
    return params.toString();
  }, []);

  return (
    <Suspense>
      <div className='space-y-5'>
        <div className='flex justify-between gap-2 px-2'>
          <Button
            variant='bordered'
            onClick={() => {
              setSelectedKeys((prev) => (prev === 'all' ? '' : 'all'));
            }}
            startContent={<SlidersHorizontalIcon className='size-[16px]' />}
            className='text-xs font-medium uppercase text-foreground'
          >
            {selectedKeys.length ? 'Collapse' : 'Expand'} all filters
          </Button>
          <Button
            variant='bordered'
            onClick={() => {
              router.push(pathname + '?' + resetQueryPath());
            }}
            className='text-xs font-medium uppercase text-foreground'
            startContent={<ListRestartIcon className='size-[18px]' />}
          >
            Reset Filters
          </Button>
        </div>
        <Accordion
          variant='splitted'
          keepContentMounted
          selectionMode='multiple'
          selectedKeys={selectedKeys}
          onSelectionChange={(keys: Selection) => {
            console.log(keys instanceof Set);
          }}
        >
          <AccordionItem
            key='1'
            aria-label='Budget'
            title='Budget'
            className='group-[.is-splitted]:shadow-small'
          >
            <Budget />
          </AccordionItem>

          <AccordionItem
            key='2'
            aria-label='Brands'
            title='Brands'
            className='group-[.is-splitted]:shadow-small'
          >
            <Brands />
          </AccordionItem>

          <AccordionItem
            key='3'
            aria-label='Models'
            title='Models'
            className='group-[.is-splitted]:shadow-small'
          >
            <Models />
          </AccordionItem>

          <AccordionItem
            key='4'
            aria-label='Body Styles'
            title='Body Styles'
            className='group-[.is-splitted]:shadow-small'
          >
            <BodyStyles />
          </AccordionItem>

          <AccordionItem
            key='5'
            aria-label='Seats'
            title='Seats'
            className='group-[.is-splitted]:shadow-small'
          >
            <NumberOfSeats />
          </AccordionItem>

          <AccordionItem
            key='6'
            aria-label='Fuel Type'
            title='Fuel Type'
            className='group-[.is-splitted]:shadow-small'
          >
            <FuelTypes />
          </AccordionItem>
        </Accordion>

        {/* <div className='px-2'>
          <Button
            variant='bordered'
            onClick={() => {
              router.push(pathname + '?' + resetQueryPath());
            }}
            // color='primary'
            // className='w-full text-lg'
          >
            Reset Filters
          </Button>
        </div> */}
      </div>
    </Suspense>
  );
};
