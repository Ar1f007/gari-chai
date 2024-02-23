import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

const OfferBtn = () => {
  return (
    <div className='flex gap-1 *:flex-1'>
      {/* <p className='mt-2 text-small light:text-[#3E444D] dark:text-foreground'>
          Don&apos;t miss out on the best offers for this month
        </p> */}
      <Button
        color='primary'
        className='shrink-0 text-medium text-default-50'
        fullWidth
        as={Link}
        href={routes.campaigns}
      >
        Checkout Offers
      </Button>

      <Button
        variant='bordered'
        color='primary'
        as={Link}
        href={`tel:${siteConfig.contactInfo.phone}`}
        className='shrink-0 text-medium font-medium'
      >
        Call Us
      </Button>
    </div>
  );
};
export default OfferBtn;
