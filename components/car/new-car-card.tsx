import { TCarSchema } from '@/schema/car';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';
import Link from 'next/link';
import { subtitle } from '../primitives';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Button } from '@nextui-org/button';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';

type CarProps = {
  car: TCarSchema;
};
export const Car = ({ car }: CarProps) => {
  const { posterImage, name, slug, price } = car;

  const url = car.carType === 'new' ? `/cars/${slug}` : `/used-cars/${slug}`;

  return (
    <Card className='border-1 border-slate-200'>
      <CardHeader className='relative h-[200px]'>
        <Link href={url}>
          <Image
            src={posterImage.thumbnailUrl ?? posterImage.originalUrl ?? PLACEHOLDER_IMAGE}
            alt={name}
            fill
            sizes='100%'
            className='object-cover'
          />
        </Link>
      </CardHeader>
      <CardBody className='mb-3 mt-5 px-4'>
        <Link href={url}>
          <h2 className={subtitle({ className: 'font-semibold' })}>{name}</h2>
        </Link>

        <p className='mb-3 text-base font-semibold text-default-600'>
          {price.min === price.max ? (
            <>{formatAsBangladeshiCurrency(price.min)}</>
          ) : (
            <>
              {formatAsBangladeshiCurrency(price.min)}
              &nbsp;&mdash;&nbsp;
              {formatAsBangladeshiCurrency(price.max)}
            </>
          )}

          {price.isNegotiable && (
            <small className='ml-2 text-xs text-foreground'>(Negotiable)</small>
          )}
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
