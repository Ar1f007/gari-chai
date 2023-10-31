import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { getHomePageCarsBySection } from '@/services';
import SectionTitle from '@/components/section-title';
import { subtitle } from '@/components/primitives';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/config/routes';
import Sliders from '@/components/slider';

export const LatestCars = async () => {
  const res = await getHomePageCarsBySection(HOME_SETTINGS_OPTIONS.latestCars);

  if (!res || !res.length) {
    return null;
  }

  return (
    <section className='mt-8 rounded-xl bg-background px-6 py-8 shadow-md md:mt-16'>
      <SectionTitle>Latest Cars</SectionTitle>

      <div className='mt-6'>
        <Sliders>
          {res.map((item) => (
            <li
              className='keen-slider__slide max-w-[372px]'
              key={item._id}
            >
              <Card className='border-1 border-slate-200 shadow-md'>
                <CardHeader className='relative h-[200px]'>
                  <Link href={routes.latestCars}>
                    <Image
                      src={item.content.posterImage.thumbnailUrl}
                      alt='cars'
                      fill
                      sizes='100%'
                      className='object-cover'
                    />
                  </Link>
                </CardHeader>
                <CardBody>
                  <Link href={routes.latestCars}>
                    <h2 className={subtitle()}>{item.content.name}</h2>
                  </Link>

                  <p className='mb-3 text-base'>{/* {priceMin} &mdash; {priceMax} */}</p>

                  {/* <Button
            color='primary'
            variant='bordered'
          >
            Check September Offers
          </Button> */}
                </CardBody>
              </Card>
            </li>
          ))}
        </Sliders>
      </div>
    </section>
  );
};
