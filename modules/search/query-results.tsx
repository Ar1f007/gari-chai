import Image from 'next/image';
import { fetchFilteredCars } from '@/services/search';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { title } from '@/components/primitives';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';

const QueryResults = async (props: { query: URLSearchParams | ReadonlyURLSearchParams }) => {
  const results = await fetchFilteredCars(props.query);

  if (typeof results === 'string') {
    return <p>{results}</p>;
  }

  if (results.status !== 'success') {
    return <p>{results.message}</p>;
  }

  if (!results.data.results.length) {
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

  return (
    <div className='max-w-3xl'>
      <ul className='flex flex-col gap-10'>
        {results.data.results.map((item) => (
          <li
            key={item._id}
            className='flex gap-5 overflow-hidden rounded-md shadow-md'
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
          </li>
        ))}
      </ul>
    </div>
  );
};
export default QueryResults;
