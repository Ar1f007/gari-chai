'use client';

import { Section } from '@/components/layout/section';
import { subtitle } from '@/components/primitives';
import { routes } from '@/config/routes';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { formatRangeToLakhCrore } from '@/lib/utils';
import { CampaignCommentForm } from '@/modules/campaigns/comment-form';
import CampaignComments from '@/modules/campaigns/comments';
import { settingsStore } from '@/store';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';

const CarSlug = () => {
  const settingsSnap = useSnapshot(settingsStore);
  const router = useRouter();

  if (!settingsStore.currentlySelectedCar) {
    return router.replace(routes.campaigns);
  }

  const car = settingsSnap.currentlySelectedCar!;

  const url = car.carType === 'new' ? `/cars/${car.slug}` : `/used-cars/${car.slug}`;

  return (
    <Section classNames='py-10 px-2'>
      <div className='container mx-auto max-w-5xl rounded-md border p-5 shadow-md'>
        <div className='flex flex-col gap-5 *:flex-1 md:flex-row md:items-stretch md:justify-between'>
          <div className='h-full w-full max-w-[450px] space-y-10'>
            <div>
              <Card className='w-full justify-between border-1 border-slate-200 shadow-sm'>
                <CardHeader className='p-0'>
                  <Link href={url}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        car.posterImage.originalUrl ||
                        car.posterImage.thumbnailUrl ||
                        PLACEHOLDER_IMAGE
                      }
                      alt={car.name}
                      width={450}
                      height={300}
                      className='h-auto w-auto object-cover'
                      loading='lazy'
                    />
                  </Link>
                </CardHeader>
                <CardBody className='justify-around px-4 pb-1'>
                  <Link href={url}>
                    <h2
                      title={car.name.length > 30 ? car.name : ''}
                      className={subtitle({
                        className: 'truncate font-semibold first-letter:capitalize',
                      })}
                    >
                      {car.name}
                    </h2>
                  </Link>

                  <div className='flex w-full flex-wrap justify-between gap-x-1 gap-y-4'>
                    <div className='flex flex-wrap gap-2'>
                      <Chip
                        variant='flat'
                        color='default'
                      >
                        {car.brand.label}
                      </Chip>
                      <Chip
                        variant='flat'
                        color='default'
                      >
                        {car.brandModel.label}
                      </Chip>
                      <Chip
                        variant='flat'
                        color='default'
                      >
                        {car.bodyStyle.label}
                      </Chip>
                    </div>

                    <Chip
                      variant='dot'
                      color='primary'
                    >
                      Starts From: 2.5Lakh
                    </Chip>
                  </div>
                </CardBody>

                <CardFooter className='flex flex-col items-start gap-4'>
                  <Chip
                    variant='flat'
                    color='default'
                  >
                    Regular Price: {formatRangeToLakhCrore(car.price.min, car.price.max)}
                  </Chip>
                  <Button
                    color='primary'
                    variant='bordered'
                    as={Link}
                    href={url}
                    size='lg'
                    className='w-full shrink-0 text-lg font-medium'
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <CampaignCommentForm />
          </div>

          <CampaignComments />
        </div>
      </div>
    </Section>
  );
};
export default CarSlug;
