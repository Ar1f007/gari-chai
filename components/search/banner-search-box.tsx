'use client';

import { FormEvent, useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Tab, Tabs } from '@nextui-org/tabs';
import Image from 'next/image';
import { NewCarSearchForm } from './new-car-search-from';
import { UsedCarSearchForm } from './used-car-form';
import { title } from '../primitives';

const SearchBox = () => {
  const [selectedTab, setSelectedTab] = useState('new-car');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className='relative min-h-[70vh]'>
      <Image
        src='https://stimg.cardekho.com/images/uploadimages/1699616873162/Under--%E2%82%B920-Lakh_CD-MasterHead-Desktop_1686x548px.jpg'
        alt='Lady standing by a car'
        priority
        className='absolute inset-0 object-cover'
        draggable={false}
        fill
        sizes='100vw'
      />
      <Card className='bg-primary-500/35 absolute left-6 top-1/2 h-[400px] w-[340px] max-w-full -translate-y-1/2 rounded-md border border-gray-300 bg-opacity-10 bg-clip-padding backdrop-blur-md backdrop-filter'>
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
    </div>
  );
};

export default SearchBox;
