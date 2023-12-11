'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSnapshot } from 'valtio';
import { RHFTextEditor } from '@/components/form/RHFTextEditor';
import { routes } from '@/config/routes';
import { invalidateTags } from '@/lib/actions';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import {
  CommentBody,
  CommentCreationPayload,
  CommentInputs,
  CommentUpdatePayload,
  commentFormSchema,
} from '@/schema/comment';
import { commentService } from '@/services/comments';
import { userStore } from '@/store';
import { generateTagNameForComments } from '@/util/generate-tag-name';
import { mapValidationErrors } from '@/util/mapValidationError';
import { createUrl } from '@/lib/utils';

type EditCommentProps = {
  isEditing: true;
  commentBody: CommentBody;
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

type CommentFormProps = {
  onSuccess?: () => void;
  hideFormCB?: () => void;
} & (AddCommentProps | EditCommentProps);

const CommentForm = (props: CommentFormProps) => {
  const userSnap = useSnapshot(userStore);

  const router = useRouter();

  const pathname = usePathname();

  const commentValFromURL = useSearchParams().get('content') || '';

  const formHandler = useForm({
    mode: 'onSubmit',
    defaultValues: {
      content: props.isEditing ? props.commentBody.content : decodeURIComponent(commentValFromURL),
    },
    resolver: zodResolver(commentFormSchema),
  });

  async function handleEditComment(data: CommentInputs, commentId: CommentBody['_id']) {
    const payload: CommentUpdatePayload = {
      commentId,
      commentBody: {
        content: data.content,
      },
    };

    const res = await commentService.editComment(payload);

    if (!res) {
      toast.error(GENERIC_ERROR_MSG);
      return;
    }

    if (res.status === 'success') {
      const tag = generateTagNameForComments(props.isEditing ? props.commentBody.car : props.car);

      await invalidateTags(tag);

      formHandler.setValue('content', '');

      props.onSuccess?.();

      return;
    }

    if (res.status === 'validationError') {
      mapValidationErrors(res.errors, formHandler);
      toast.error(res.message ?? 'Invalid inputs');
      return;
    }

    toast.error(res.message || GENERIC_ERROR_MSG);
  }

  function handleUnauthenticatedUser() {
    const params = new URLSearchParams();

    params.set('pathname', pathname);
    params.set('content', formHandler.getValues('content'));

    const url = encodeURI(createUrl(routes.login, params));

    http: toast.error('Please login to continue', {
      action: {
        label: 'Go to Login',
        onClick: () => router.push(url),
      },
    });
  }

  async function onSubmit(data: CommentInputs) {
    if (!userSnap.user) {
      handleUnauthenticatedUser();
      return;
    }

    if (props.isEditing) {
      handleEditComment(data, props.commentBody._id);
      return;
    }

    const payload: CommentCreationPayload = {
      car: props.car,
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
      const tag = generateTagNameForComments(props.car);

      await invalidateTags(tag);

      formHandler.setValue('content', '');

      props.onSuccess?.();

      return;
    }

    if (res.status === 'validationError') {
      mapValidationErrors(res.errors, formHandler);
      toast.error(res.message ?? 'Invalid inputs');
      return;
    }

    toast.error(res.message || GENERIC_ERROR_MSG);
  }

  return (
    <FormProvider {...formHandler}>
      <form onSubmit={formHandler.handleSubmit(onSubmit)}>
        <RHFTextEditor name='content' />

        <div className='mt-4 flex gap-2'>
          <Button
            type='submit'
            variant='solid'
            color='primary'
            isLoading={formHandler.formState.isSubmitting}
            className='text-foreground-50'
          >
            {props.isEditing ? 'Update' : 'Post Comment'}
          </Button>

          {props?.hideFormCB && (
            <Button
              type='button'
              variant='ghost'
              onPress={() => props?.hideFormCB?.()}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default CommentForm;
