'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { link as linkStyles } from '@nextui-org/theme';
import { Select, SelectItem } from '@nextui-org/select';

import { Logo } from '@/components/icons';
import TopHeader from './top-header';
import Search from '@/components/search';

import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import Icon from '@/components/icon';

import manifest from '@/data/index.json';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = clsx(
    linkStyles({ color: 'foreground', size: 'lg' }),
    'data-[active=true]:text-primary-50 data-[active=true]:font-medium capitalize',
  );

  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <TopHeader />
      <NextUINavbar
        maxWidth='2xl'
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className='shadow-sm'
        classNames={{
          wrapper: '2xl:px-0',
        }}
      >
        <NavbarContent className='hidden w-full lg:flex'>
          <li className='w-full max-w-[200px] lg:min-w-[200px]'>
            <Select
              label='Select location'
              startContent={<Icon name='map-pin' />}
              defaultSelectedKeys={['dhaka']}
              size='sm'
              className='min-w-[180px]'
            >
              {manifest.locations.map((location) => (
                <SelectItem key={location.value}>{location.label}</SelectItem>
              ))}
            </Select>
          </li>

          <li className='flex-auto justify-center'>
            <ul className='ml-2 flex justify-center gap-4 2xl:gap-8'>
              {siteConfig.navMenuItems.map((item) => (
                <NavbarItem key={item.href}>
                  <Link
                    href={item.href}
                    color='foreground'
                    data-active={pathname === item.href}
                    className={navLinkClasses}
                  >
                    {item.label}
                  </Link>
                </NavbarItem>
              ))}
            </ul>
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
            <ul className='mx-4 mt-2 flex flex-col gap-2'>
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    href={item.href}
                    data-active={pathname === item.href}
                    className={clsx('w-full', navLinkClasses)}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </ul>
          </li>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
export default Navbar;
