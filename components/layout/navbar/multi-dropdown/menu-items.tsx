'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { link as linkStyles } from '@nextui-org/theme';
import { NavbarItem } from '@nextui-org/navbar';
import Dropdown from './dropdown';
import { ChevronDown } from '@/components/icons';
import { TDropdownItem } from '@/types';

const MenuItems = ({
  item,
  depthLevel,
  currentActivePathname,
}: {
  item: TDropdownItem;
  depthLevel: number;
  currentActivePathname: string;
}) => {
  const [dropdown, setDropdown] = useState(false);

  const navLinkClasses = clsx(
    linkStyles({ color: 'foreground', size: depthLevel > 0 ? 'md' : 'lg' }),
    'data-[active=true]:text-primary-50 data-[active=true]:font-medium capitalize transform transition duration-150 ease-in-out w-full',
    { 'px-6 py-2 shadow-sm hover:bg-primary-900': depthLevel > 0 },
  );

  function handleOnMouseEnter() {
    setDropdown(true);
  }

  function handleOnMouseLeave() {
    setDropdown(false);
  }

  return (
    <>
      {item.hasChildren ? (
        <li
          className='relative'
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <>
            <button
              type='button'
              aria-haspopup='menu'
              aria-expanded={dropdown ? 'true' : 'false'}
              onClick={() => setDropdown((prev) => !prev)}
              className={clsx(navLinkClasses, {
                'flex items-center justify-between': depthLevel > 0,
              })}
            >
              {item.label}

              <span className='pl-1'>
                {depthLevel > 0 ? (
                  <ChevronDown
                    fill='currentColor'
                    size={16}
                    className='-rotate-90'
                  />
                ) : (
                  <ChevronDown
                    fill='currentColor'
                    size={16}
                    className='transform duration-250 ease-soft-spring group-hover:rotate-180'
                  />
                )}
              </span>
            </button>
            <Dropdown
              submenus={item.children}
              dropdown={dropdown}
              depthLevel={depthLevel}
              currentActivePathname={currentActivePathname}
            />
          </>
        </li>
      ) : (
        <NavbarItem key={item.href}>
          <Link
            href={item.href}
            color='foreground'
            data-active={currentActivePathname === item.href}
            className={navLinkClasses}
          >
            {item.label}
          </Link>
        </NavbarItem>
      )}
    </>
  );
};

export default MenuItems;
