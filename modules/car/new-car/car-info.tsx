import { subtitle, title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import AddToWishlist from './add-to-wishlist';
import { FilledStar } from '@/components/icons';
import repeat from '@/util/repeat';
import { Button } from '@nextui-org/button';
import OfferBtn from '../offer-btn';

type Props = {
  car: TCarSchema;
};

const CarInfo = ({ car }: Props) => {
  const { name, price } = car;
  return (
    <div className='flex flex-col gap-2 xl:gap-5'>
      <h1 className={title()}>{name}</h1>

      <div className='mt-1 flex items-center gap-1'>
        <div className='flex items-center'>
          {repeat(3).map((i) => (
            <FilledStar key={i} />
          ))}
        </div>

        <span className='inline-block text-base'>Reviews (300)</span>
      </div>

      <p className={subtitle({ className: 'my-0 font-bold' })}>TK {price}</p>

      <OfferBtn />

      <AddToWishlist />
    </div>
  );
};
export default CarInfo;
