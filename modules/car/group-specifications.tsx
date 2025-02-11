import { TGroupSpecification } from '@/schema/car';
import SpecInfo from './spec-info';

type GroupSpecificationsProps = {
  specificationGroup: TGroupSpecification;
};

const GroupSpecifications = ({ specificationGroup }: GroupSpecificationsProps) => {
  if (!specificationGroup.values?.length) return null;

  return (
    <section className='flex flex-col space-y-2 pl-2'>
      <h2 className='font-medium capitalize text-default-700 dark:text-foreground'>
        {specificationGroup.groupName}
      </h2>

      <div className='grid grid-cols-1 gap-8 pt-3 lg:grid-cols-2'>
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
