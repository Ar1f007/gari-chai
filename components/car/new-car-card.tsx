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

  const url = `/cars/${slug}`;
  return (
    <Card className='border-1 border-slate-200 shadow-md'>
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
      <CardBody>
        <Link href={url}>
          <h2 className={subtitle({ className: 'font-semibold' })}>{name}</h2>
        </Link>

        <p className='mb-3 text-base font-semibold text-default-600'>
          {formatAsBangladeshiCurrency(price)}
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
