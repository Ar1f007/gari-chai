import { TCarSchema } from '@/schema/car';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';
import Link from 'next/link';
import { subtitle } from '../primitives';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Button } from '@nextui-org/button';
import { formatRangeToLakhCrore } from '@/lib/utils';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';

type CarProps = {
  car: TCarSchema;
};
export const Car = ({ car }: CarProps) => {
  const { posterImage, name, slug, price } = car;

  const url = car.carType === 'new' ? `/cars/${slug}` : `/used-cars/${slug}`;

  return (
    <Card className='h-full max-h-[405px] justify-between border-1 border-slate-200 shadow-lg'>
      <CardHeader className='p-0'>
        <Link href={url}>
          <Image
            src={posterImage.originalUrl || posterImage.thumbnailUrl || PLACEHOLDER_IMAGE}
            alt={name}
            width={400}
            height={150}
            className='aspect-[3/2]'
          />
        </Link>
      </CardHeader>
      <CardBody className='px-4'>
        <Link href={url}>
          <h2 className={subtitle({ className: 'font-semibold' })}>{name}</h2>
        </Link>

        <p className='mb-4 text-base font-semibold text-default-600'>
          {price.min === price.max ? (
            <>{formatAsBangladeshiCurrency(price.min)}</>
          ) : (
            <>
              {/* {formatAsBangladeshiCurrency(price.min)}
              &nbsp;&mdash;&nbsp;
              {formatAsBangladeshiCurrency(price.max)} */}
              {formatRangeToLakhCrore(28000000, 28000000)}
              <sup className='text-primary'>*</sup>
            </>
          )}

          {price.isNegotiable && <small className='text-xs text-foreground'>(Negotiable)</small>}
        </p>

        <Button
          color='primary'
          variant='bordered'
          as={Link}
          href={url}
        >
          View Details
        </Button>
      </CardBody>
    </Card>
  );
};
