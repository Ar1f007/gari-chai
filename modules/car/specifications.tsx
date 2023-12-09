import { TCarSchema } from '@/schema/car';
import KeySpecifications from './key-specifications';
import AdditionalSpecifications from './additional-specs';

type SpecificationsType = {
  car: TCarSchema;
};

const Specifications = ({ car }: SpecificationsType) => {
  return (
    <article className='mt-8 flex flex-col space-y-4 rounded-xl bg-foreground-50 p-6'>
      <KeySpecifications car={car} />

      <AdditionalSpecifications car={car} />
    </article>
  );
};
export default Specifications;
