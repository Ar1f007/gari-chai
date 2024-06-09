import { subtitle } from '@/components/primitives';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { formatRangeToLakhCrore } from '@/lib/utils';
import type { TCarPartSchema } from '@/schema/car-part';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';
import { Button } from '@nextui-org/button';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';
import Link from 'next/link';

type CarPartProps = {
  carPart: TCarPartSchema;
};

const CarPartCard = ({ carPart }: CarPartProps) => {
  const { slug, posterImage, name, price } = carPart;

  const url = '/parts/cars/' + slug;

  return (
    <Card className='h-full max-h-[425px] justify-between border-1 border-slate-200 shadow-lg'>
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

      <CardBody>
        <Link href={url}>
          <h2
            title={name.length > 30 ? name : ''}
            className={subtitle({ className: 'truncate font-semibold first-letter:capitalize' })}
          >
            {name}
          </h2>
        </Link>

        <p className='mb-4 text-lg font-semibold text-default-600'>
          {formatAsBangladeshiCurrency(price)}
        </p>

        <Button
          color='primary'
          variant='bordered'
          as={Link}
          href={url}
          className='shrink-0'
        >
          View Details
        </Button>
      </CardBody>
    </Card>
  );
};
export default CarPartCard;
