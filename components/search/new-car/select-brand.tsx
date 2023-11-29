import useGetAllAndPopularBrands from '@/hooks/useGetAllAndPopularBrands';
import { Select, SelectItem, SelectSection } from '@nextui-org/select';
import { ChangeEvent, Fragment } from 'react';
import { selectClassNames } from '../new-car-search-from';
import { searchQueryActions, searchQueryStore } from '@/store';
import { useSnapshot } from 'valtio';

const SelectBrand = () => {
  const searchQuerySnap = useSnapshot(searchQueryStore);

  const { isLoading: fetchingBrands, brands, errMsg: brandErrMSg } = useGetAllAndPopularBrands();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const [brandId, brandName] = e.target.value.split('-');

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
        className='mt-8 max-w-xs'
        classNames={{
          ...selectClassNames,
        }}
        defaultSelectedKeys={[
          searchQueryStore.newCar.byBrand.brandId + '-' + searchQueryStore.newCar.byBrand.brand,
        ]}
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
