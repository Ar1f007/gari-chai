import { title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';

const Colors = ({ car }: { car: TCarSchema }) => {
  if (!car.colors.length) return null;

  return (
    <div className='mt-8 flex flex-col space-y-4 rounded-xl bg-foreground-50 p-6'>
      <h2 className={title({ size: 'xs' })}>Colors</h2>
    </div>
  );
};
export default Colors;
