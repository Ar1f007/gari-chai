import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';

import { subtitle } from '@/components/primitives';
import { THomeSettingApiSchemaSingleInstance } from '@/schema/common';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

type SlideProps = {
  item: THomeSettingApiSchemaSingleInstance;
};
export const Slide = ({ item }: SlideProps) => {
  const { content } = item;

  const imgSrc =
    (content.posterImage.thumbnailUrl ?? content.posterImage.originalUrl) || PLACEHOLDER_IMAGE;

  return (
    <li className='keen-slider__slide'>
      <Card className='border-1 border-slate-200 shadow-md'>
        <CardHeader className='relative h-[200px]'>
          <Image
            src={imgSrc}
            alt='cars'
            fill
            sizes='100%'
            className='object-cover'
          />
        </CardHeader>
        <CardBody>
          <h2 className={subtitle()}>{content.name}</h2>

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
  );
};
