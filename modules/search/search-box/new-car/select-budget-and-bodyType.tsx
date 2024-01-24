import { Fragment } from 'react';
import { Select, SelectItem } from '@nextui-org/select';

import selectOptionData from '@/data/searchForm.json';
import { searchQueryActions, searchQueryStore } from '@/store';
import useGetBodyTypes from '@/hooks/useGetBodyTypes';

import { selectClassNames } from './new-car-search-form';

const SelectBudgetAndBodyType = () => {
  const { isLoading, bodyTypes, errMsg } = useGetBodyTypes();

  function getSelectedKeysForBudget() {
    if (searchQueryStore.newCar.byBudget.budget) {
      return [searchQueryStore.newCar.byBudget.budget];
    }

    return undefined;
  }

  function getSelectedKeysForBodyType() {
    if (searchQueryStore.newCar.byBudget.bodyType) {
      return [searchQueryStore.newCar.byBudget.bodyType];
    }

    return undefined;
  }

  return (
    <Fragment>
      <Select
        aria-label='Select budget'
        placeholder='Select budget'
        variant='bordered'
        color='primary'
        size='sm'
        // disableAnimation
        isRequired
        selectedKeys={getSelectedKeysForBudget()}
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
        // disableAnimation
        selectedKeys={getSelectedKeysForBodyType()}
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
