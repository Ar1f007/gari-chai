import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import type {} from '@redux-devtools/extension';

type Store = {
  layout: {
    isMenuOpen: boolean;
  };

  routes: {
    currentActivePath: string;
  };
};

const initialState: Store = {
  layout: {
    isMenuOpen: false,
  },

  routes: {
    currentActivePath: '/',
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
};

devtools(settingsStore, {
  name: 'layout',
  enabled: typeof window === undefined ? false : true,
});
