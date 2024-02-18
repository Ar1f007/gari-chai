import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import type {} from '@redux-devtools/extension';
import { IS_CLIENT } from '@/lib/constants';

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
};

devtools(settingsStore, {
  name: 'layout',
  enabled: IS_CLIENT,
});
