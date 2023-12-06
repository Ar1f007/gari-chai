import { ReadonlyURLSearchParams } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
 * console.log(url); // Output: '/users?name=John&age=30'
 */
export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
