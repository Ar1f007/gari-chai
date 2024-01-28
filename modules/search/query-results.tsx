import Image from 'next/image';
import { title } from '@/components/primitives';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';
import { TCarSchema } from '@/schema/car';
import Link from 'next/link';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Chip } from '@nextui-org/chip';

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
    if (item.carType === 'new') {
      return `/cars/${item.slug}`;
    }

    return `/cars/${item.slug}`;
  }

  return (
    <ul className='flex flex-col gap-5'>
      {props.items.map((item) => (
        <li
          key={item._id}
          className='overflow-hidden rounded-md  shadow-md '
        >
          <Link
            href={getHref(item)}
            className='flex flex-col sm:flex-row sm:gap-5'
          >
            <Image
              src={
                (item.posterImage.thumbnailUrl ?? item.posterImage.originalUrl) || PLACEHOLDER_IMAGE
              }
              alt={item.name}
              width={200}
              height={200}
              className='max-h-48 w-full object-cover sm:max-w-48'
            />

            <div className='flex flex-col gap-2 truncate p-3 pb-5 sm:px-0 md:py-5'>
              <h2 className={title({ size: 'xs', className: 'font-light text-default-800' })}>
                {item.name}
              </h2>
              <p className='truncate text-sm font-medium text-default-800 md:mb-3 md:text-base'>
                {formatAsBangladeshiCurrency(item.price.min)}
                &nbsp;&mdash;&nbsp;
                {formatAsBangladeshiCurrency(item.price.max)}
                {item.price.isNegotiable && (
                  <small className='ml-2 text-xs text-foreground'>(Negotiable)</small>
                )}
              </p>

              <div className='flex flex-wrap gap-2'>
                <Chip>{item.brand.label}</Chip>
                <Chip>{item.brandModel.label}</Chip>
                <Chip>{item.bodyStyle.label}</Chip>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default QueryResults;
