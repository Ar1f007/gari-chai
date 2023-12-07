import { ChangeEvent, Fragment } from 'react';
import { useSnapshot } from 'valtio';

import { searchQueryActions, searchQueryStore } from '@/store';
import useGetCarModels from '@/hooks/useGetCarModels';

import SelectBrand from './select-brand';
import SelectModel from './select-model';

const SelectBrandAndModel = () => {
  const searchQuerySnap = useSnapshot(searchQueryStore).newCar;

  const { isLoading, data, errMsg } = useGetCarModels({
    brandId: searchQuerySnap.byBrand.brandId,
  });

  function handleSelectModel(e: ChangeEvent<HTMLSelectElement>) {
    searchQueryActions.setSearchQuery({
      carType: 'newCar',
      category: 'byBrand',
      categoryPropertyName: 'model',
      value: e.target.value,
    });
  }

  function getDefaultModelValue() {
    if (searchQueryStore.newCar.byBrand.model) {
      return [searchQueryStore.newCar.byBrand.model];
    }

    return undefined;
  }

  return (
    <Fragment>
      <SelectBrand />
      <SelectModel
        defaultSelected={getDefaultModelValue()}
        isLoading={isLoading}
        items={data}
        errMsg={errMsg}
        handleChange={handleSelectModel}
      />
    </Fragment>
  );
};
export default SelectBrandAndModel;
