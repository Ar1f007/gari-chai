import { Textarea, TextAreaProps } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

type RHFTextareaProps = {
    name: string;
} & TextAreaProps;

export const RHFTextarea = (props: RHFTextareaProps) => {
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
                <Textarea
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
