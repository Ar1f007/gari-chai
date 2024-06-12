import { Input, InputProps } from '@nextui-org/input';
import { Controller, get, useFormContext } from 'react-hook-form';

type RHFInputProps = {
  name: string;
} & InputProps;

export const RHFInput = (props: RHFInputProps) => {
  const { name, variant = 'flat', ...rest } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <Input
          variant={variant}
          isInvalid={error}
          color={error ? 'danger' : 'default'}
          errorMessage={error && error?.message}
          {...field}
          {...rest}
        />
      )}
    />
  );
};
