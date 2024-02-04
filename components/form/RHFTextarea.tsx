import { Textarea, TextAreaProps } from '@nextui-org/input';
import { Controller, get, useFormContext } from 'react-hook-form';

type RHFTextareaProps = {
  name: string;
} & TextAreaProps;

export const RHFTextarea = (props: RHFTextareaProps) => {
  const { name, ...rest } = props;

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
        <Textarea
          variant='flat'
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
