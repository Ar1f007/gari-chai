'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { TCarSchema } from '@/schema/car';
import SpecInfo from './spec-info';

type AdditionalSpecificationsProps = {
  car: TCarSchema;
};

const motionProps = {
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      height: 'auto',
      transition: {
        height: {
          type: 'spring',
          stiffness: 500,
          damping: 30,
          duration: 1,
        },
        opacity: {
          easings: 'ease',
          duration: 1,
        },
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      height: 0,
      transition: {
        height: {
          easings: 'ease',
          duration: 0.25,
        },
        opacity: {
          easings: 'ease',
          duration: 0.3,
        },
      },
    },
  },
};

const itemClasses = {
  base: 'py-0 w-full',
  titleWrapper: 'flex-shrink-0 flex-grow-0 min-w-fit',
  title: 'font-semibold text-medium text-primary',
  trigger: 'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
  indicator: 'text-medium font-bold text-primary',
};

const AdditionalSpecifications = ({ car }: AdditionalSpecificationsProps) => {
  return (
    <Accordion
      motionProps={motionProps}
      itemClasses={itemClasses}
    >
      <AccordionItem
        key='1'
        aria-label='Specs and Features'
        title='View All Specs and Features'
      >
        <div className='grid grid-cols-1 gap-8 pl-2 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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

          {/* {
            !!car.specificationsByGroup?.length && car.specificationsByGroup.map((group) => (

            ))
          } */}

          {!!car.additionalSpecifications &&
            car.additionalSpecifications.map((specification, idx) => (
              <SpecInfo
                key={'specification_' + idx}
                name={specification.name}
                value={specification.value}
              />
            ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
};
export default AdditionalSpecifications;
