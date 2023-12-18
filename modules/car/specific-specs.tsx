import { TCarSchema } from '@/schema/car';

type SpecInfoProps = {
  name: string;
  value: string | number | boolean;
};
const SpecInfo = (props: SpecInfoProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-5'>
        <h4 className='whitespace-nowrap text-base text-default-500'>{props.name}</h4>

        {typeof props.value === 'boolean' ? (
          <span>checkmark {props.value}</span>
        ) : (
          <p className='text-base font-medium capitalize'>{props.value}</p>
        )}
      </div>
      <div className='border-b-1 border-solid border-gray-200' />
    </div>
  );
};

const SpecificSpecs = ({ car }: { car: TCarSchema }) => {
  return (
    <div className='mb-8 grid grid-cols-1 gap-8 pl-2 pt-3 lg:grid-cols-2'>
      <SpecInfo
        name='Brand'
        value={typeof car.brand === 'string' ? car.brand : car.brand.name}
      />
      <SpecInfo
        name='Body Style'
        value={typeof car.bodyStyle === 'string' ? car.bodyStyle : car.bodyStyle.name}
      />

      <SpecInfo
        name='Transmission'
        value={car.transmission}
      />
      <SpecInfo
        name='Number of Doors'
        value={car.numOfDoors}
      />
    </div>
  );
};
export default SpecificSpecs;
