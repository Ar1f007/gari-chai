import { useSnapshot } from 'valtio';
import SelectBrand from './select-brand';
import SelectModel from './select-model';
import { searchQueryActions, searchQueryStore } from '@/store';
import useGetCarModels from '@/hooks/useGetCarModels';
import { ChangeEvent, Fragment } from 'react';

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

  return (
    <Fragment>
      <SelectBrand />
      <SelectModel
        defaultSelected={searchQueryStore.newCar.byBrand.model}
        isLoading={isLoading}
        items={data}
        errMsg={errMsg}
        handleChange={handleSelectModel}
      />
    </Fragment>
  );
};
export default SelectBrandAndModel;
