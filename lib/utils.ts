import { ReadonlyURLSearchParams } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { routes } from '@/config/routes';
import { URLSearchParams } from 'url';

/**
 * Creates a URL string with the given pathname and parameters.
 *
 * @param {string} pathname - The path of the URL.
 * @param {URLSearchParams | ReadonlyURLSearchParams} params - The parameters to be added to the URL.
 * @returns {string} The URL string with the pathname and parameters.
 *
 * @example
 * const pathname = '/users';
 * const params = new URLSearchParams({ name: 'John', age: '30' });
 * const url = createUrl(pathname, params);
 * Output: '/users?name=John&age=30'
 */
export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRangeToLakhCrore(min: number, max: number) {
  const formatValue = (value: number) => {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Cr';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(2).replace(/(\d)(?=(\d{3})+)/g, '$1,') + ' Lakh';
    } else if (value >= 1000) {
      return (value / 100000).toFixed(2).replace(/\.00$/, '') + ' Lakh';
    } else {
      return (value / 100000).toFixed(2).replace(/\.00$/, '') + ' Lakh';
    }
  };

  if (min === max) {
    return 'BDT ' + formatValue(min);
  }

  const startFormatted = formatValue(min);
  const endFormatted = formatValue(max);

  return `BDT ${startFormatted} - ${endFormatted}`;
}

export function getRedirectPath(params: URLSearchParams | ReadonlyURLSearchParams) {
  try {
    const redirectPath = params.get('pathname');

    if (redirectPath) {
      const mutableParams = new URLSearchParams(params.toString());

      mutableParams.delete('pathname');

      const url = createUrl(decodeURIComponent(redirectPath), params);
      return url;
    }

    return routes.home;
  } catch (e) {
    console.log(e);
    return routes.home;
  }
}

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
