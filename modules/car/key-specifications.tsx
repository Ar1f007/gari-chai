import { title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import { FuelIcon, Settings as SettingsIcon, UtilityPoleIcon } from 'lucide-react';
import KeySpecificationItem from './key-specification-item';

type Props = {
  car: TCarSchema;
};
const KeySpecifications = ({ car }: Props) => {
  return (
    <>
      <h2 className={title({ size: 'xs' })}>
        Key Specs of <span className='capitalize'>{car.name}</span>
      </h2>

      <div className='mt-12 flex flex-col gap-8'>
        <div className='2xl:grid-cols-45 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Engine */}
          <KeySpecificationItem
            icon={SettingsIcon}
            propertyName='Engine'
            value={car.engine.type}
          />

          {/* Fuel */}
          <KeySpecificationItem
            icon={FuelIcon}
            propertyName='Fuel Type'
            value={car.fuel.typeInfo.type}
          />

          {/* Transmission */}
          <KeySpecificationItem
            icon={UtilityPoleIcon}
            propertyName='Transmission'
            value={car.transmission}
          />
        </div>
        <div className='h-[2px] w-full bg-gray-300' />
      </div>
    </>
  );
};
export default KeySpecifications;
