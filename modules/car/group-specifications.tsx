import { TGroupSpecification } from '@/schema/car';
import SpecInfo from './spec-info';

type GroupSpecificationsProps = {
  specificationGroup: TGroupSpecification;
};

const GroupSpecifications = ({ specificationGroup }: GroupSpecificationsProps) => {
  return (
    <section className='flex flex-col space-y-2 pl-2'>
      <h2 className='font-medium text-default-700 dark:text-foreground'>
        {specificationGroup.groupName}
      </h2>

      <div className='grid grid-cols-1 gap-8 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {specificationGroup.values.map((specification, idx) => (
          <SpecInfo
            key={idx}
            specInfo={specification}
          />
        ))}
      </div>
    </section>
  );
};
export default GroupSpecifications;
