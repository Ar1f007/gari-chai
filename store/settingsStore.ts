import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import type {} from '@redux-devtools/extension';
import { IS_CLIENT } from '@/lib/constants';
import { TCarSchema } from '@/schema/car';

type Store = {
  layout: {
    isMenuOpen: boolean;
  };

  routes: {
    currentActivePath: string;
  };

  notifications: {
    campaigns: {
      isPromoShown: boolean;
    };
  };

  currentlySelectedCar: TCarSchema | null;
};

type Path<T> = string & keyof T;

const initialState: Store = {
  layout: {
    isMenuOpen: false,
  },

  routes: {
    currentActivePath: '/',
  },

  notifications: {
    campaigns: {
      isPromoShown: false,
    },
  },

  currentlySelectedCar: null,
};

export const settingsStore = proxy<Store>(initialState);

export const settingsActions = {
  toggleMenuState(isOpen: boolean) {
    settingsStore.layout.isMenuOpen = isOpen;
  },

  setCurrentActivePathname(pathname: string) {
    settingsStore.routes.currentActivePath = pathname;
  },

  toggleProperty<T>(path: Path<T>, value: boolean) {
    const nestedPaths = path.split('.');
    let targetObject: any = settingsStore;
    for (const nestedPath of nestedPaths.slice(0, -1)) {
      targetObject = targetObject[nestedPath];
    }
    targetObject[nestedPaths[nestedPaths.length - 1]] = value;
  },

  setSelectedCar(car: TCarSchema) {
    settingsStore.currentlySelectedCar = car;
  },
};

devtools(settingsStore, {
  name: 'layout',
  enabled: IS_CLIENT,
});
