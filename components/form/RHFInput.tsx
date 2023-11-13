import { Input, InputProps } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

type RHFInputProps = {
  name: string;
} & InputProps;

export const RHFInput = (props: RHFInputProps) => {
  const { name, ...rest } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <Input
          variant='flat'
          isInvalid={hasError}
          color={hasError ? 'danger' : 'default'}
          errorMessage={hasError && errors[name]?.message?.toString()}
          {...field}
          {...rest}
        />
      )}
    />
  );
};
