import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

type Store = {
  isMenuOpen: boolean;
};

export const layoutStore = proxy<Store>({
  isMenuOpen: false,
});

export const layoutActions = {
  toggleMenuState(isOpen: boolean) {
    layoutStore.isMenuOpen = isOpen;
  },
};

devtools(layoutStore, {
  name: 'layout',
  enabled: true,
});
