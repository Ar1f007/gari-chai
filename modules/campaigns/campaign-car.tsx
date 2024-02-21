import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';

import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Button } from '@nextui-org/button';
import { formatRangeToLakhCrore } from '@/lib/utils';
import { subtitle, title } from '@/components/primitives';
import { MakeOfferButton } from './car-make-offer-btn';
import { TCarCampaign } from '@/schema/campaign';
import { Chip } from '@nextui-org/chip';

type CarProps = {
  car: TCarCampaign['newCars'][number]['car'];
  campaignPrice: TCarCampaign['newCars'][number]['campaignPrice'];
};
export const CampaignCarCard = ({ car, campaignPrice }: CarProps) => {
  const { posterImage, name, slug, price } = car;

  const url = car.carType === 'new' ? `/cars/${slug}` : `/used-cars/${slug}`;

  return (
    <Card className='h-full justify-between border-1 border-slate-200 shadow-lg'>
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
      <CardBody className='justify-around px-4 pb-4'>
        <Link href={url}>
          <h2
            title={name.length > 30 ? name : ''}
            className={subtitle({ className: 'truncate font-semibold first-letter:capitalize' })}
          >
            {name}
          </h2>
        </Link>

        <p className='text-lg font-semibold text-default-600'>
          {formatRangeToLakhCrore(price.min, price.max)}
          {price.isNegotiable && (
            <>
              <sup className='text-primary'>*</sup>
              <small className='text-xs text-foreground'>(Negotiable)</small>
            </>
          )}
        </p>

        <div className='mt-4 flex items-center gap-2'>
          <Chip
            variant='flat'
            color='primary'
          >
            Campaign Price
          </Chip>

          <Chip
            variant='dot'
            color='primary'
          >
            {formatRangeToLakhCrore(price.min, price.max)}
          </Chip>
        </div>
      </CardBody>

      <CardFooter className='flex justify-between gap-4 pt-0 *:flex-1 *:shrink-0 *:font-medium'>
        <Button
          color='primary'
          variant='bordered'
          as={Link}
          href={url}
        >
          View Details
        </Button>

        <MakeOfferButton
          car={car}
          campaignPrice={campaignPrice}
        />
      </CardFooter>
    </Card>
  );
};
