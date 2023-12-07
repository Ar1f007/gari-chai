'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Tab, Tabs } from '@nextui-org/tabs';
import { NewCarSearchForm } from './new-car-search-from';
import { UsedCarSearchForm } from './used-car-form';
import { title } from '../primitives';

const SearchBox = () => {
  const [selectedTab, setSelectedTab] = useState('new-car');

  return (
    <Card className='bg-primary-500/35 absolute left-6 top-1/2 hidden w-[340px] -translate-y-1/2 rounded-md border border-gray-300 bg-opacity-10 bg-clip-padding backdrop-blur-md backdrop-filter xl:flex '>
      <CardHeader className={title({ size: 'xs', className: 'text-center text-white' })}>
        Find Your Right Car
      </CardHeader>
      <CardBody className='overflow-hidden'>
        <Tabs
          fullWidth
          size='md'
          aria-label='Tabs form'
          selectedKey={selectedTab}
          onSelectionChange={(val) => setSelectedTab(val.toString())}
          classNames={{
            tab: 'h-10',
            tabContent: 'group-data-[selected=true]:text-[#FFF] text-[#222] font-medium',
            cursor: 'bg-[#222]',
            panel: 'h-full',
          }}
        >
          <Tab
            key='new-car'
            title='New Car'
          >
            <NewCarSearchForm />
          </Tab>

          <Tab
            key='used-car'
            title='Used Car'
          >
            <UsedCarSearchForm />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default SearchBox;
