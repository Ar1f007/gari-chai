'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { ChangeEvent, Fragment } from 'react';
import { selectClassNames } from './new-car-search-form';

type SelectModelProps = {
  items: {
    value: string;
    label: string;
  }[];
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
  errMsg: string;
  defaultSelected: string[] | undefined;
};

const SelectModel = ({
  isLoading,
  defaultSelected,
  handleChange,
  items,
  errMsg,
}: SelectModelProps) => {
  return (
    <Fragment>
      <Select
        aria-label='Select Model'
        placeholder='Select brand first'
        size='sm'
        variant='bordered'
        isLoading={isLoading}
        onChange={handleChange}
        errorMessage={errMsg}
        classNames={{
          ...selectClassNames,
        }}
        items={items}
        defaultSelectedKeys={defaultSelected}
        isRequired
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
    </Fragment>
  );
};
export default SelectModel;
