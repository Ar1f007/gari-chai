import { TApiValidationError } from '@/types';
import { FieldValues, UseFormReturn } from 'react-hook-form';

// Maps APIs validation error object to hook forms errors
export const mapValidationErrors = <FormFields extends FieldValues>(
  errors: TApiValidationError['errors'],
  formHandler: UseFormReturn<FormFields>,
) => {
  errors.forEach((error) => {
    //@ts-ignore
    formHandler.setError(error.fieldName, {
      type: 'validation',
      message: error.message,
    });
  });
};
