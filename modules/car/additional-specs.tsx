'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { TCarSchema } from '@/schema/car';
import SpecInfo from './spec-info';
import GroupSpecifications from './group-specifications';

import SpecificSpecs from './specific-specs';

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
  if (!car.specificationsByGroup?.length && !car.additionalSpecifications?.length) return null;

  return (
    <Accordion
      motionProps={motionProps}
      itemClasses={itemClasses}
      className='px-0'
    >
      <AccordionItem
        key='1'
        aria-label='Specs and Features'
        title='View All Specs and Features'
      >
        <SpecificSpecs car={car} />

        {/* Group Specifications */}
        {car.specificationsByGroup?.length && (
          <ul className='space-y-6'>
            {car.specificationsByGroup.map((specificationGroup, idx) => (
              <li key={specificationGroup._id}>
                <GroupSpecifications specificationGroup={specificationGroup} />
              </li>
            ))}
          </ul>
        )}

        {/* other specification */}
        {car.additionalSpecifications?.length && (
          <div className='mt-6'>
            <h2 className='ml-2 font-medium text-default-700 dark:text-foreground'>Other Info</h2>
            <ul className='ml-2 grid grid-cols-1 gap-8 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {car.additionalSpecifications.map((additionalSpec) => (
                <li key={additionalSpec._id}>
                  <SpecInfo specInfo={additionalSpec} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};
export default AdditionalSpecifications;
