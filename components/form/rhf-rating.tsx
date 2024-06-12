'use client';

import { Rating } from 'react-simple-star-rating';

import { Controller, get, useFormContext } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { XIcon } from 'lucide-react';

export const RHFRatingInput = (props: any) => {
  const { name, label } = props;

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const error = get(errors, name);

  return (
    <div>
      {/* {label && <label className='ml-[2px]'>{label}</label>} */}
      <Controller
        control={control}
        name='rating'
        rules={{
          validate: (rating) => rating > 0,
        }}
        render={({ field: { onChange, value } }) => (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <Rating
                onClick={onChange}
                initialValue={value}
                allowFraction
                transition
                SVGclassName='inline-block'
                size={30}
                fillColorArray={['#f14f45', '#f16c45', '#f18845', '#f1b345', '#f1d045']}
              />
              <p className='text-xl font-bold'>{value}</p>
            </div>

            {!!value && (
              <Button
                isIconOnly
                variant='flat'
                aria-label='Clear'
                onClick={() => setValue(name, 0)}
                type='button'
              >
                <XIcon />
              </Button>
            )}
          </div>
        )}
      />

      <p className='text-tiny text-danger'>{error && error?.message}</p>
    </div>
  );
};
