import { Fragment, Suspense } from 'react';

import CarPartImages from '@/components/car-parts/car-parts-images';
import OfferBtn from '@/modules/car/offer-btn';

import { subtitle, title } from '@/components/primitives';
import { carPartsService } from '@/services/parts/car-part';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';
import { convertHtmlToText } from '@/util/html-to-text';

type Props = {
  params: {
    slug: string;
  };
};

const SingleCarPartPage = async ({ params: { slug } }: Props) => {
  const carPart = await carPartsService.getPartDetails({
    slug,
  });

  const data = carPart.data;

  return (
    <Fragment>
      <Suspense>
        {!data ? (
          <p className='my-10 text-center font-semibold capitalize'>{carPart.message}</p>
        ) : (
          <section className='mx-auto max-w-screen-xl px-4 py-10'>
            <div className='flex flex-col gap-10'>
              <div className='grid gap-10 rounded-md border p-3 shadow-sm lg:grid-cols-2 lg:p-6'>
                <CarPartImages
                  posterImg={data.posterImage}
                  additionalImages={data.imageUrls}
                />

                <div className='h-[calc(100%_-_76px)] space-y-5 '>
                  <h2 className={title({ size: 'sm', className: 'text-gray-800' })}>{data.name}</h2>

                  <p className={subtitle({ className: 'text-xl text-gray-600' })}>
                    <b>Price:</b> {formatAsBangladeshiCurrency(data.price)}
                  </p>

                  <p className='text-lg text-gray-600'>
                    <b>Warranty:</b> {!!data.warranty?.length ? data.warranty : 'N/A'}
                  </p>

                  <p className='text-lg text-gray-600'>
                    <b>Manufacturer:</b> {!!data.manufacturer?.length ? data.manufacturer : 'N/A'}
                  </p>

                  <OfferBtn />
                </div>
              </div>

              {!!data.description?.length && (
                <div className='space-y-3 rounded-md border p-3 shadow-sm lg:p-6'>
                  <h3
                    className={title({
                      size: 'sm',
                      className: 'text-lg font-semibold text-gray-800',
                    })}
                  >
                    Product Details
                  </h3>
                  <div className='text-gray-700'>{convertHtmlToText(data.description)}</div>
                </div>
              )}
            </div>
          </section>
        )}
      </Suspense>
    </Fragment>
  );
};
export default SingleCarPartPage;
