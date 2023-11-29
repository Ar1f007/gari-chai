import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { IS_CLIENT } from '@/lib/constants';

type TNewCarByBudget = {
  budget: string;
  bodyType: string;
};

type TNewCarByBrand = {
  brand: string;
  brandId: string;
  model: string;
};

type TUsedCarByBudget = {
  budget: string;
  city: string;
};

type TUsedCarByModel = {
  model: string;
  city: string;
};

type TSearchQueries = {
  newCar: {
    byBudget: TNewCarByBudget;
    byBrand: TNewCarByBrand;
  };
  usedCar: {
    byBudget: TUsedCarByBudget;
    byModel: TUsedCarByModel;
  };
};

type TSearchQueryType = keyof TSearchQueries;

const initialState: TSearchQueries = {
  newCar: {
    byBudget: {
      budget: '',
      bodyType: '',
    },
    byBrand: {
      brand: '',
      brandId: '',
      model: '',
    },
  },

  usedCar: {
    byBudget: {
      budget: '',
      city: '',
    },
    byModel: {
      model: '',
      city: '',
    },
  },
};

export const searchQueryStore = proxy<TSearchQueries>(initialState);

export const searchQueryActions = {
  setSearchQuery<
    T extends TSearchQueryType,
    U extends keyof TSearchQueries[T],
    V extends keyof TSearchQueries[T][U],
  >({
    carType,
    category,
    categoryPropertyName,
    value,
  }: {
    carType: T;
    category: U;
    categoryPropertyName: V;
    value: TSearchQueries[T][U][V];
  }) {
    searchQueryStore[carType][category][categoryPropertyName] = value;
  },
};

devtools(searchQueryStore, {
  name: 'searchQuery',
  enabled: IS_CLIENT,
});
