'use client';

import Link from 'next/link';
import { useRouter, useParams, useSearchParams, notFound, redirect } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { z } from 'zod';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/react';

import { Section } from '@/components/layout/section';
import { subtitle } from '@/components/primitives';
import { routes } from '@/config/routes';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { formatRangeToLakhCrore } from '@/lib/utils';
import CampaignCommentPageSkeleton from '@/modules/campaigns/campaign-comment-page-skeleton';
import { CampaignCommentForm } from '@/modules/campaigns/comment-form';
import CampaignComments from '@/modules/campaigns/comments';
import { getCarBySlug } from '@/services/car/getCarBySlug';
import { settingsActions, settingsStore } from '@/store';

const CarSlug = () => {
  const params = useParams();

  const searchParams = useSearchParams();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const settingsSnap = useSnapshot(settingsStore);

  async function fetchCar() {
    const carType = searchParams.get('type');
    const campaignMinPrice = searchParams.get('priceMin');
    const campaignMaxPrice = searchParams.get('priceMax');

    const parsedParams = z
      .object({
        slug: z.string().min(1),
        carType: z.enum(['new-car', 'used-car']),
        priceMin: z.coerce.number(),
        priceMax: z.coerce.number(),
      })
      .safeParse({
        slug: params.carSlug,
        carType: carType,
        priceMin: campaignMinPrice,
        priceMax: campaignMaxPrice,
      });

    if (!parsedParams.success) {
      return router.push(routes.campaigns);
    }

    try {
      const res = await getCarBySlug(parsedParams.data);

      if (!res) {
        return;
      }

      settingsActions.setSelectedCar({
        details: res,
        campaignPrice: {
          min: parsedParams.data.priceMin,
          max: parsedParams.data.priceMax,
        },
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!settingsStore.currentlySelectedCar) {
      fetchCar();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <CampaignCommentPageSkeleton />;
  }

  if (!isLoading && !settingsSnap.currentlySelectedCar) {
    return redirect(routes.campaigns);
  }

  const car = settingsSnap.currentlySelectedCar!;

  const url =
    car.details.carType === 'new' ? `/cars/${car.details.slug}` : `/used-cars/${car.details.slug}`;

  return (
    <Suspense>
      <Section classNames='py-10 px-2'>
        <div className='container mx-auto max-w-5xl rounded-md border p-5 shadow-md'>
          <div className='flex flex-col gap-5 *:flex-1 md:flex-row md:items-stretch md:justify-between'>
            <div className='h-full w-full space-y-10 xl:max-w-[480px]'>
              <Card className='w-full justify-between border-1 border-slate-200 shadow-sm'>
                <CardHeader className='p-0'>
                  <Link href={url}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        car.details.posterImage.originalUrl ||
                        car.details.posterImage.thumbnailUrl ||
                        PLACEHOLDER_IMAGE
                      }
                      alt={car.details.name}
                      width={450}
                      height={300}
                      className='min-h-[250px] w-auto object-cover'
                      loading='lazy'
                    />
                  </Link>
                </CardHeader>
                <CardBody className='justify-around px-4 pb-1'>
                  <Link href={url}>
                    <h2
                      title={car.details.name.length > 30 ? car.details.name : ''}
                      className={subtitle({
                        className: 'truncate font-semibold first-letter:capitalize',
                      })}
                    >
                      {car.details.name}
                    </h2>
                  </Link>

                  <div className='flex w-full flex-wrap justify-between gap-x-1 gap-y-4'>
                    <div className='flex flex-wrap gap-2'>
                      <Chip
                        variant='flat'
                        color='default'
                      >
                        {car.details.brand.label}
                      </Chip>
                      <Chip
                        variant='flat'
                        color='default'
                      >
                        {car.details.brandModel.label}
                      </Chip>
                      <Chip
                        variant='flat'
                        color='default'
                      >
                        {car.details.bodyStyle.label}
                      </Chip>
                    </div>

                    <Chip
                      variant='dot'
                      color='primary'
                    >
                      Starts From:{' '}
                      {formatRangeToLakhCrore(car.campaignPrice.min, car.campaignPrice.min)}
                    </Chip>
                  </div>
                </CardBody>

                <CardFooter className='flex flex-col items-start gap-4'>
                  <Chip
                    variant='flat'
                    color='default'
                  >
                    Regular Price:{' '}
                    {formatRangeToLakhCrore(car.details.price.min, car.details.price.max)}
                  </Chip>
                  <Button
                    variant='flat'
                    color='primary'
                    as={Link}
                    href={url}
                    size='lg'
                    className='w-full shrink-0 text-lg font-medium'
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>

              <CampaignCommentForm />
            </div>

            <Suspense>
              <CampaignComments />
            </Suspense>
          </div>
        </div>
      </Section>
    </Suspense>
  );
};
export default CarSlug;
