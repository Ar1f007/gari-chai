import { TGroupSpecification } from '@/schema/car';
import { CheckIcon, XIcon } from 'lucide-react';

type SpecInfoProps = {
  specInfo: TGroupSpecification['values'][number];
};
const SpecInfo = ({ specInfo }: SpecInfoProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-5'>
        <h4 className='whitespace-nowrap text-base capitalize text-default-500'>{specInfo.name}</h4>

        {specInfo.valueType === 'boolean' ? (
          <span>
            {specInfo.value ? (
              <CheckIcon className='text-primary' />
            ) : (
              <XIcon className='text-danger' />
            )}
          </span>
        ) : (
          <p className='text-base font-medium capitalize'>{specInfo.value}</p>
        )}
      </div>
      <div className='border-b-1 border-solid border-gray-200' />
    </div>
  );
};
export default SpecInfo;
