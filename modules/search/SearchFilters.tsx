"use client";

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export const SearchFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  console.log(searchParams);
  const createQueryString = useCallback(
    (name: string, value: string) => {

      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      
      return params.toString()
    },
    [searchParams]
  )


  const resetQueryPath = useCallback(() => {
    const params = new URLSearchParams()
    params.set('q', '')
    return params.toString()
  }, []);

  return (
    <>
      <p>Sort By {searchParams.get('q')}</p>
 
      {/* using useRouter */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        ASC
      </button>
 
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        DESC
      </Link>

      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('range', '85000-86000')
        }
      >
        Range
      </Link>

      <Link href={
          // <pathname>?sort=desc
          pathname + '?' + resetQueryPath()

        }>
          Reset
        </Link>
    </>
  )
}
