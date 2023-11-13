import { IconSvgProps } from '@/types';
import { LucideIcon } from 'lucide-react';

type KeySpecProps = {
  propertyName: string;
  value: string;
  icon?: LucideIcon | React.FC<IconSvgProps>;
};

const KeySpec = (props: KeySpecProps) => {
  const { icon: Icon, propertyName, value } = props;

  return (
    <div className='flex gap-2 '>
      <div>
        {Icon && (
          <Icon
            size={48}
            className='stroke-[1px] text-gray-600'
          />
        )}
      </div>
      <div>
        <p className='text-gray-600'>{propertyName}</p>
        <strong className='text-gray-600'>{value}</strong>
      </div>
    </div>
  );
};
export default KeySpec;