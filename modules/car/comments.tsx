'use client';

import { RHFTextEditor } from '@/components/form/RHFTextEditor';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const Comments = () => {
  const formHandler = useForm({
    defaultValues: {
      tapatap: '',
    },
    resolver: zodResolver(
      z.object({
        tapatap: z.string().min(1, 'required bhaijan'),
      }),
    ),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className='max-w-sm py-10'>
      <FormProvider {...formHandler}>
        <form onSubmit={formHandler.handleSubmit(onSubmit)}>
          <RHFTextEditor name='tapatap' />
          <button type='submit'>Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};
export default Comments;
