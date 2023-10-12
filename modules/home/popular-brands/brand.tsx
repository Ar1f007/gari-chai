import Link from 'next/link';
import Image from 'next/image';

import { TBrand } from '@/types';
import { routes } from '@/config/routes';
import { title } from '@/components/primitives';

const Brand = (props: TBrand) => {
  const { imgSrc, brandName } = props;

  const path = routes.brands + '/' + brandName;

  return (
    <Link
      href={path}
      className='block overflow-hidden rounded-lg pb-3 shadow-md duration-300 ease-in-out hover:shadow-xl'
    >
      <div className='relative h-80 w-full'>
        <Image
          src={imgSrc}
          alt={brandName}
          className='object-cover'
          fill
          sizes='100%'
        />
      </div>

      <h3
        className={title({
          size: 'xs',
          fullWidth: true,
          className: 'mt-2 text-center uppercase',
        })}
      >
        {brandName}
      </h3>
    </Link>
  );
};
export default Brand;
