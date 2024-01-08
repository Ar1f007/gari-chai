'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback } from 'react';
import Budget from "@/modules/search/filters/budget";

export const SearchFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const resetQueryPath = useCallback(() => {
    const params = new URLSearchParams();
    params.set('query', '');
    return params.toString();
  }, []);

  return (
    <Suspense>
      <p>Sort By {searchParams.get('query')}</p>

        <div className="space-y-5">
            <Budget />
        </div>

      {/* using useRouter */}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    // <pathname>?sort=asc*/}
      {/*    router.push(pathname + '?' + createQueryString('sort', 'asc'));*/}
      {/*  }}*/}
      {/*>*/}
      {/*  ASC*/}
      {/*</button>*/}

      {/*<Link*/}
      {/*  href={*/}
      {/*    // <pathname>?sort=desc*/}
      {/*    pathname + '?' + createQueryString('sort', 'desc')*/}
      {/*  }*/}
      {/*>*/}
      {/*  DESC*/}
      {/*</Link>*/}

      {/*<Link*/}
      {/*  href={*/}
      {/*    // <pathname>?sort=desc*/}
      {/*    pathname + '?' + createQueryString('range', '85000-86000')*/}
      {/*  }*/}
      {/*>*/}
      {/*  Range*/}
      {/*</Link>*/}

      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + resetQueryPath()
        }
      >
        Reset
      </Link>
    </Suspense>
  );
};
