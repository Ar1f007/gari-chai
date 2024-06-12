import { Radio, RadioGroup } from '@nextui-org/react';

export const UsedCarSearchForm = () => {
  return (
    <form>
      <RadioGroup
        orientation='horizontal'
        classNames={{ wrapper: 'justify-around' }}
        color='primary'
        defaultValue='by-budget'
        className='mt-4'
      >
        <Radio
          value='by-budget'
          classNames={{ label: 'font-medium text-primary-900' }}
        >
          By Budget
        </Radio>

        <Radio
          value='by-brand'
          classNames={{ label: 'font-medium text-primary-900' }}
        >
          By Brand
        </Radio>
      </RadioGroup>

      <p className='py-5 text-center text-white'>Coming soon</p>
    </form>
  );
};
