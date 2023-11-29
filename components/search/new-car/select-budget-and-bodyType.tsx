import { Fragment } from 'react';
import { Select, SelectItem } from '@nextui-org/select';

import selectOptionData from '@/data/searchForm.json';
import { searchQueryActions } from '@/store';
import { selectClassNames } from '../new-car-search-from';
import useGetBodyTypes from '@/hooks/useGetBodyTypes';

const SelectBudgetAndBodyType = () => {
  const { isLoading, bodyTypes, errMsg } = useGetBodyTypes();

  return (
    <Fragment>
      <Select
        aria-label='Select budget'
        placeholder='Select budget'
        variant='bordered'
        color='primary'
        size='sm'
        disableAnimation
        isRequired
        onChange={(e) =>
          searchQueryActions.setSearchQuery({
            carType: 'newCar',
            category: 'byBudget',
            categoryPropertyName: 'budget',
            value: e.target.value,
          })
        }
        classNames={selectClassNames}
      >
        {selectOptionData.newCar.budgets.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </Select>

      <Select
        aria-label='Select body type'
        placeholder='Select body type'
        color='primary'
        variant='bordered'
        size='sm'
        disableAnimation
        isRequired
        onChange={(e) =>
          searchQueryActions.setSearchQuery({
            carType: 'newCar',
            category: 'byBudget',
            categoryPropertyName: 'bodyType',
            value: e.target.value,
          })
        }
        classNames={selectClassNames}
        isLoading={isLoading}
        items={bodyTypes}
        errorMessage={errMsg ? errMsg : ''}
      >
        {(item) => (
          <SelectItem
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        )}
      </Select>
    </Fragment>
  );
};
export default SelectBudgetAndBodyType;