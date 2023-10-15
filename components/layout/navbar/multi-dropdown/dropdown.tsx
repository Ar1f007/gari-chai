import clsx from 'clsx';
import MenuItems from '../multi-dropdown/menu-items';

import { TDropdownItem } from '@/types';

const Dropdown = ({
  submenus,
  dropdown,
  depthLevel,
  currentActivePathname,
}: {
  submenus: TDropdownItem[];
  dropdown: boolean;
  depthLevel: number;
  currentActivePathname: string;
}) => {
  depthLevel += 1;

  return (
    <ul
      className={clsx(
        'absolute left-0 right-0 min-w-[200px] origin-top scale-0 transform rounded-sm bg-background shadow-inner transition duration-250 ease-in-out',
        {
          'scale-100': dropdown,
          'left-[100%] top-0 origin-top-left': depthLevel > 1,
        },
      )}
    >
      {submenus.map((submenu) => (
        <MenuItems
          key={submenu.id}
          item={submenu}
          depthLevel={depthLevel}
          currentActivePathname={currentActivePathname}
        />
      ))}
    </ul>
  );
};
export default Dropdown;
