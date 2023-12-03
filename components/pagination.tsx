'use client';

import { createUrl } from '@/lib/utils';
import {
  Pagination as NextUIPagination,
  PaginationProps as NextUIPaginationProps,
} from '@nextui-org/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
} & Omit<NextUIPaginationProps, 'total'>;

const Pagination = (props: PaginationProps) => {
  const { totalPages } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handlePageChange(pageNumber: number) {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    router.push(createUrl(pathname, params));
  }

  if (totalPages < 2) {
    return null;
  }

  return (
    <NextUIPagination
      showControls
      total={totalPages}
      color='primary'
      onChange={(page) => handlePageChange(page)}
      classNames={{ cursor: 'text-white' }}
    />
  );
};
export default Pagination;
