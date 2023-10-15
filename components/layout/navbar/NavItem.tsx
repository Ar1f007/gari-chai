import { TDropdownItem } from '@/types';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavbarMenuItem } from '@nextui-org/navbar';

import { link as linkStyles } from '@nextui-org/theme';
import { Button } from '@nextui-org/button';
import { ChevronDown } from '@/components/icons';
import { useEffect, useState } from 'react';

const NavItem = ({ item }: { item: TDropdownItem }) => {
  const [dropdown, setDropdown] = useState(false);

  const pathname = usePathname();

  const navLinkClasses = clsx(
    linkStyles({ color: 'foreground', size: dropdown ? 'md' : 'lg' }),
    'data-[active=true]:text-primary-50 data-[active=true]:font-medium capitalize',
  );

  const dropdownBtnClasses = clsx(
    linkStyles({ color: 'foreground', size: 'lg' }),
    'justify-start capitalize p-0 h-6',
  );

  useEffect(() => {}, [pathname]);

  if (item.hasChildren) {
    return (
      <li>
        <Button
          disableRipple
          variant='light'
          className={dropdownBtnClasses}
          onClick={() => setDropdown((prev) => !prev)}
        >
          <span>{item.label}</span>
          <span>
            <ChevronDown
              fill='currentColor'
              size={18}
              className={clsx('transform duration-250 ease-soft-spring', {
                'rotate-180': dropdown,
              })}
            />
          </span>
        </Button>

        {dropdown && (
          <ul className={clsx('mt-2 flex h-full flex-col gap-2 border-l-1 border-gray-400 pl-4')}>
            {item.children.map((item) => (
              <NavItem
                key={item.id}
                item={item}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <NavbarMenuItem>
      <Link
        href={item.href}
        data-active={pathname === item.href}
        className={clsx('w-full', navLinkClasses)}
      >
        {item.label}
      </Link>
    </NavbarMenuItem>
  );
};
export default NavItem;
