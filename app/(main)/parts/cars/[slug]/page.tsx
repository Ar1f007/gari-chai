import { Section } from '@/components/layout/section';
import { subtitle, title } from '@/components/primitives';
import { carPartsService } from '@/services/parts/car-part';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';
import { convertHtmlToText } from '@/util/html-to-text';
import { Chip } from '@nextui-org/chip';
import Image from 'next/image';
import { Fragment, Suspense } from 'react';

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
          <section className='mx-auto max-w-screen-xl px-2 py-10'>
            <div className='flex flex-col gap-10'>
              <div className='grid gap-10 lg:grid-cols-2'>
                <Image
                  src={data.posterImage.originalUrl}
                  alt={data.name}
                  width={400}
                  height={300}
                  className='h-auto w-full max-w-[600px] rounded object-cover'
                />

                <div className='flex flex-col gap-5'>
                  <h2 className={title()}>{data.name}</h2>
                  <p className={subtitle()}>
                    <b>Price:</b> {formatAsBangladeshiCurrency(data.price)}
                  </p>

                  <p>
                    <b>Warranty:</b> {!!data.warranty?.length ? data.warranty : 'N/A'}
                  </p>

                  <p>
                    <b>Manufacturer:</b> {!!data.manufacturer?.length ? data.manufacturer : 'N/A'}
                  </p>
                </div>
              </div>

              {!!data.description?.length && (
                <div className='line-clamp-4 leading-relaxed text-default-600'>
                  {convertHtmlToText(data.description)}
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
