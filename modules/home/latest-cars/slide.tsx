import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';

import { Button } from '@nextui-org/button';
import { subtitle } from '@/components/primitives';
import { THomeSettingApiSchemaSingleInstance } from '@/schema/common';

type SlideProps = {
  item: THomeSettingApiSchemaSingleInstance;
};
export const Slide = ({ item }: SlideProps) => {
  const { content } = item;

  return (
    <li className='keen-slider__slide'>
      <Card className='border-1 border-slate-200 shadow-md'>
        <CardHeader className='relative h-[200px]'>
          <Image
            src={content.posterImage.thumbnailUrl}
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
