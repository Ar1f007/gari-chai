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
    <div className='mb-8 grid grid-cols-1 gap-8 pl-2 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <SpecInfo
        name='Brand'
        value={typeof car.brand === 'string' ? car.brand : car.brand.name}
      />
      <SpecInfo
        name='Body Style'
        value={typeof car.bodyStyle === 'string' ? car.bodyStyle : car.bodyStyle.name}
      />
      <SpecInfo
        name='Engine'
        value={car.engine.type}
      />

      {car.engine.horsePower && (
        <SpecInfo
          name='Horse Power'
          value={car.engine.horsePower}
        />
      )}
      {car.engine.torque && (
        <SpecInfo
          name='Torque'
          value={car.engine.torque + 'Nm'}
        />
      )}

      {car.fuel.economy?.city && (
        <SpecInfo
          name='City'
          value={car.fuel.economy?.city + ' kmpl'}
        />
      )}
      {car.fuel.economy?.highway && (
        <SpecInfo
          name='Highway'
          value={car.fuel.economy?.highway + ' kmpl'}
        />
      )}

      <SpecInfo
        name='Transmission'
        value={car.transmission}
      />
      <SpecInfo
        name='Number of Doors'
        value={car.numOfDoors}
      />
      {car?.acceleration?.topSpeed && (
        <SpecInfo
          name='Top Speed'
          value={car.acceleration?.topSpeed + ' kmph'}
        />
      )}
      {car?.acceleration?.zeroTo60 && (
        <SpecInfo
          name='Zero to 60 speed'
          value={car.acceleration?.zeroTo60 + ' seconds'}
        />
      )}
    </div>
  );
};
export default SpecificSpecs;
