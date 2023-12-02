import Image from 'next/image';
import { title } from '@/components/primitives';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';
import { TCarSchema } from '@/schema/car';
import Link from 'next/link';

type QueryResultsProps = {
  items: TCarSchema[];
};

const QueryResults = async (props: QueryResultsProps) => {
  if (!props.items.length) {
    return (
      <div className='mx-auto max-w-xl rounded-md bg-gray-100 px-4 py-4 shadow-md dark:bg-gray-800 lg:px-8'>
        <p className='text-xl font-medium text-gray-800 dark:text-foreground-50'>
          We were not able to find any matching results.
        </p>

        <p className='mt-2 font-medium text-gray-600 dark:text-foreground-50'>
          Please try a different search query.
        </p>
      </div>
    );
  }

  function getHref(item: TCarSchema) {
    const url = `/cars/${item.slug}`;
    return url;
  }

  return (
    <ul className='flex flex-col gap-10'>
      {props.items.map((item) => (
        <li
          key={item._id}
          className='overflow-hidden rounded-md shadow-md'
        >
          <Link
            href={getHref(item)}
            className='flex gap-5'
          >
            <Image
              src={item.posterImage.thumbnailUrl}
              alt={item.name}
              width={200}
              height={200}
            />

            <div className='flex flex-col gap-3'>
              <h2 className={title({ size: 'xs' })}>{item.name}</h2>
              <p className='mb-3 text-base font-semibold text-default-600'>
                {formatAsBangladeshiCurrency(item.price.min)}
                &nbsp;&mdash;&nbsp;
                {formatAsBangladeshiCurrency(item.price.max)}
                {item.price.isNegotiable && (
                  <small className='ml-2 text-xs text-foreground'>(Negotiable)</small>
                )}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default QueryResults;
