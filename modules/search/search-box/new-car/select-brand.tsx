import useGetAllAndPopularBrands from '@/hooks/useGetAllAndPopularBrands';
import { Select, SelectItem, SelectSection } from '@nextui-org/select';
import { ChangeEvent, Fragment } from 'react';
import { searchQueryActions, searchQueryStore } from '@/store';
import { useSnapshot } from 'valtio';
import { selectClassNames } from './new-car-search-form';

const SelectBrand = () => {
  const searchQuerySnap = useSnapshot(searchQueryStore);

  const { isLoading: fetchingBrands, brands, errMsg: brandErrMSg } = useGetAllAndPopularBrands();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const [brandId, brandName] = e.target.value.split('-');

    // at first reset the model field if there is any model value present
    if (searchQueryStore.newCar.byBrand.model) {
      // only perform reset if the current `brandId` is new
      if (brandId !== searchQueryStore.newCar.byBrand.brandId) {
        searchQueryActions.setSearchQuery({
          carType: 'newCar',
          category: 'byBrand',
          categoryPropertyName: 'model',
          value: '',
        });
      }
    }

    searchQueryActions.setSearchQuery({
      carType: 'newCar',
      category: 'byBrand',
      categoryPropertyName: 'brand',
      value: brandName,
    });

    searchQueryActions.setSearchQuery({
      carType: 'newCar',
      category: 'byBrand',
      categoryPropertyName: 'brandId',
      value: brandId,
    });
  }

  function getDefaultValue() {
    if (searchQueryStore.newCar.byBrand.brandId) {
      return [
        searchQueryStore.newCar.byBrand.brandId + '-' + searchQueryStore.newCar.byBrand.brand,
      ];
    }

    return undefined;
  }

  return (
    <Fragment>
      <Select
        aria-label='Select brand'
        placeholder='Select brand'
        size='sm'
        variant='bordered'
        isLoading={fetchingBrands}
        onChange={handleChange}
        errorMessage={brandErrMSg}
        classNames={{
          ...selectClassNames,
        }}
        defaultSelectedKeys={getDefaultValue()}
        isRequired
      >
        {brands && !!brands.popularBrands.length ? (
          <SelectSection
            title='Popular Brands'
            showDivider
            classNames={{
              heading: 'font-medium text-primary',
            }}
          >
            {brands.popularBrands.map((brand) => (
              <SelectItem key={brand._id + '-' + brand.name}>{brand.name}</SelectItem>
            ))}
          </SelectSection>
        ) : (
          <SelectItem
            key='hidden'
            className='hidden'
          >
            Hidden
          </SelectItem>
        )}

        <SelectSection
          title='All Brands'
          classNames={{
            heading: 'font-medium text-primary',
          }}
        >
          {brands ? (
            brands.allBrands.map((brand) => (
              <SelectItem key={brand._id + '-' + brand.name}>{brand.name}</SelectItem>
            ))
          ) : (
            <SelectItem key='all'>No brands</SelectItem>
          )}
        </SelectSection>
      </Select>
    </Fragment>
  );
};
export default SelectBrand;
