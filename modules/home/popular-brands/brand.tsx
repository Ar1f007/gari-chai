import Link from 'next/link';
import Image from 'next/image';

import { routes } from '@/config/routes';
import { title } from '@/components/primitives';
import { THomeSettingApiBrandSchemaSingleInstance } from '@/schema/common';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

type BrandProps = {
  brand: THomeSettingApiBrandSchemaSingleInstance;
};

const Brand = (props: BrandProps) => {
  const { content } = props.brand;

  const path = routes.brands + '/' + content.slug;

  return (
    <Link
      href={path}
      className='flex flex-col items-center overflow-hidden rounded-lg pb-3 shadow-md duration-300 ease-in-out hover:shadow-xl'
    >
      <Image
        src={content.image.originalUrl ?? PLACEHOLDER_IMAGE}
        alt={content.name}
        width={200}
        height={200}
        className='object-cover'
      />

      <h3
        className={title({
          size: 'xs',
          fullWidth: true,
          className: 'mt-2 text-center uppercase',
        })}
      >
        {content.name}
      </h3>
    </Link>
  );
};
export default Brand;
