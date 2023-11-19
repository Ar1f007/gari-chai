'use client';
import { RHFTextEditor } from '@/components/form/RHFTextEditor';
import { routes } from '@/config/routes';
import { invalidateTags } from '@/lib/actions';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { CommentCreationPayload, CommentInputs, commentFormSchema } from '@/schema/comment';
import { commentService } from '@/services/comments';
import { userStore } from '@/store';
import { mapValidationErrors } from '@/util/mapValidationError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { redirect } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSnapshot } from 'valtio';

type EditCommentProps = {
  isEditing: true;
  commentBody: any;
};

type AddCommentProps = {
  isEditing: false;
  car: string;
} & (ParentCommentProps | ChildCommentProps);

type ParentCommentProps = {
  isChild: false;
};

type ChildCommentProps = {
  isChild: true;
  parentId: string;
};

type CommentFormProps = AddCommentProps | EditCommentProps;

const CommentForm = (props: CommentFormProps) => {
  const userSnap = useSnapshot(userStore);

  const formHandler = useForm({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(commentFormSchema),
  });

  async function onSubmit(data: CommentInputs) {
    if (!userSnap.user) {
      toast.error('Please login to continue');
      return;
    }

    const payload: CommentCreationPayload = {
      car: props.isEditing ? props.commentBody : props.car,
      user: userSnap.user._id,
      content: data.content,
      isChild: props.isEditing ? null : props.isChild,
    };

    if (!props.isEditing && props.isChild) {
      payload.parentId = props.parentId;
    }

    const res = await commentService.addComment(payload);

    if (!res) {
      toast.error(GENERIC_ERROR_MSG);
      return;
    }

    if (res.status === 'success') {
      await invalidateTags(props.isEditing ? props.commentBody : props.car);

      return;
    }

    if (res.status === 'validationError') {
      mapValidationErrors(res.errors, formHandler);
      toast.error(res.message ?? 'Invalid inputs');
      return;
    }

    toast.error(res.message || GENERIC_ERROR_MSG);

    // console.log(res);
  }

  function handleAuth() {
    if (userSnap.status == 'loggedIn') return;

    redirect(routes.login);
  }

  return (
    <FormProvider {...formHandler}>
      <form
        onSubmit={formHandler.handleSubmit(onSubmit)}
        className='mt-8'
      >
        <div onClick={handleAuth}>
          <RHFTextEditor name='content' />
        </div>
        <Button
          type='submit'
          variant='solid'
          color='primary'
          isLoading={formHandler.formState.isSubmitting}
          className='mt-4 text-foreground-50'
        >
          Post Comment
        </Button>
      </form>
    </FormProvider>
  );
};
export default CommentForm;
