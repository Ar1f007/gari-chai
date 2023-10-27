'use client';

import Link from 'next/link';

import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';

import { Button } from '@nextui-org/button';

import { Logo } from '@/components/icons';
import Search from '@/components/search';

import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';

import MenuItems from './multi-dropdown/menu-items';
import { useSnapshot } from 'valtio';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { settingsActions, settingsStore } from '@/store';
import SelectLocation from './SelectLocation';
import NavItem from './NavItem';

const Navbar = () => {
  const settingSnap = useSnapshot(settingsStore);

  const pathname = usePathname();

  function renderNavMenuItems() {
    return siteConfig.navMenuItems.map((item) => {
      const depthLevel = 0;
      return (
        <MenuItems
          key={item.id}
          item={item}
          depthLevel={depthLevel}
        />
      );
    });
  }

  useEffect(() => {
    if (settingsStore.layout.isMenuOpen) {
      settingsActions.toggleMenuState(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <NextUINavbar
        maxWidth='2xl'
        isMenuOpen={settingSnap.layout.isMenuOpen}
        onMenuOpenChange={settingsActions.toggleMenuState}
        className='shadow-sm'
        classNames={{
          wrapper: '2xl:px-0',
        }}
      >
        {/* Desktop */}
        <NavbarContent className='hidden w-full lg:flex'>
          <li className='w-full max-w-[200px] lg:min-w-[200px]'>
            <SelectLocation />
          </li>

          <li className='flex-auto justify-center'>
            <ul className='ml-2 flex justify-center gap-4 2xl:gap-8'>{renderNavMenuItems()}</ul>
          </li>

          <li>
            <Button
              as={Link}
              href={routes.loan}
              color='primary'
              radius='full'
              className='text-white hover:bg-primary-200'
            >
              Car Loan
            </Button>
          </li>
        </NavbarContent>

        {/* Mobile */}
        <NavbarContent className='lg:hidden'>
          <NavbarBrand as='li'>
            <Link href={routes.home}>
              <Logo />
            </Link>
          </NavbarBrand>

          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <li>
            <Search />
          </li>
          <li>
            <ul className='mx-4 mt-2 flex flex-col gap-6'>
              {siteConfig.navMenuItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  currentActivePathname={pathname}
                />
              ))}
            </ul>
          </li>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
export default Navbar;
