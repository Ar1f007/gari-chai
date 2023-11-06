import { Button } from '@nextui-org/button';

const OfferBtn = () => {
  return (
    <div>
      <Button
        color='primary'
        className='text-medium text-slate-50'
        fullWidth
      >
        Checkout Offers
      </Button>
      <p className='mt-2 text-small text-[#3E444D]'>
        Don&apos;t miss out on the best offers for this month
      </p>
    </div>
  );
};
export default OfferBtn;
