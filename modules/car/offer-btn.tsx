import { Button } from '@nextui-org/button';

const OfferBtn = () => {
  return (
    <div>
      <Button
        color='primary'
        className='text-medium text-slate-50 md:max-w-md'
        fullWidth
      >
        Checkout Offers
      </Button>
      <p className='mt-2 text-small light:text-[#3E444D] dark:text-foreground'>
        Don&apos;t miss out on the best offers for this month
      </p>
    </div>
  );
};
export default OfferBtn;
