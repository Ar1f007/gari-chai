'use client';

import { memo } from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import Icon from '@/components/icon';

import manifest from '@/data/index.json';

const SelectLocation = () => {
  // TODO REPLACE IT
  return null;
  return (
    <Select
      label='Select location'
      startContent={<Icon name='map-pin' />}
      defaultSelectedKeys={['dhaka']}
      size='sm'
      className='min-w-[180px]'
    >
      {manifest.locations.map((location) => (
        <SelectItem
          key={location.value}
          value={location.value}
        >
          {location.label}
        </SelectItem>
      ))}
    </Select>
  );
};
export default memo(SelectLocation);
