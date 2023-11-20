'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@nextui-org/button';
import { EditIcon, MinusCircleIcon, ReplyAllIcon, ReplyIcon, XIcon } from 'lucide-react';

import { CommentBody } from '@/schema/comment';
import CommentForm from './comment-form';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store';
import { commentService } from '@/services/comments';
import { toast } from 'sonner';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { invalidateTags } from '@/lib/actions';
import { generateTagNameForComments } from '@/util/generate-tag-name';

type Props = {
  comment: CommentBody;
  children: ReactNode;
};
const ActionButtons = ({ comment, children }: Props) => {
  const userSnap = useSnapshot(userStore);

  const [showReplies, setShowReplies] = useState(false);
  const [commentForm, setShowCommentForm] = useState(false);
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEditComment() {
    setEditCommentForm(true);
    hideCommentForm();
  }

  function hideEditCommentForm() {
    setEditCommentForm(false);
  }

  function toggleShowRepliesVisibility() {
    setShowReplies((prev) => !prev);
  }

  function showCommentForm() {
    setShowCommentForm(true);

    hideEditCommentForm();
    toggleShowRepliesVisibility();
  }

  function hideCommentForm() {
    setShowCommentForm(false);
  }

  async function handleDeleteComment() {
    try {
      setLoading(true);
      const res = await commentService.deleteComment(comment._id);

      if (!res) {
        toast.error(GENERIC_ERROR_MSG);
        return;
      }

      if (res.status === 'success') {
        const tag = generateTagNameForComments(comment.car); // car id

        await invalidateTags(tag);

        toast.success('Deleted successfully');

        return;
      }

      toast.error(res.message ?? GENERIC_ERROR_MSG);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='flex flex-wrap items-center'>
        {comment.depth === 0 && (
          <Button
            size='sm'
            variant='light'
            onPress={showCommentForm}
            color='default'
          >
            <ReplyIcon size={18} /> Reply
          </Button>
        )}

        {comment.children.length > 0 && (
          <Button
            variant='light'
            size='sm'
            onPress={toggleShowRepliesVisibility}
            color='default'
          >
            <ReplyAllIcon size={18} />
            {comment.children.length} replies
          </Button>
        )}

        {userSnap.user && userSnap.user._id === comment.user._id && (
          <>
            <Button
              variant='light'
              size='sm'
              onPress={handleEditComment}
              color='primary'
            >
              <EditIcon size={18} /> Edit
            </Button>
            <Button
              variant='light'
              size='sm'
              onPress={handleDeleteComment}
              color='danger'
              isLoading={loading}
            >
              <MinusCircleIcon size={18} /> Delete
            </Button>
          </>
        )}
      </div>

      {editCommentForm && (
        <div className='mt-3'>
          <CommentForm
            isEditing={true}
            commentBody={comment}
            onSuccess={hideEditCommentForm}
            hideFormCB={hideEditCommentForm}
          />
        </div>
      )}

      {commentForm && (
        <div className='mt-3'>
          <CommentForm
            isEditing={false}
            car={comment.car}
            isChild={true}
            parentId={comment._id}
            onSuccess={hideCommentForm}
            hideFormCB={hideCommentForm}
          />
        </div>
      )}

      {showReplies && children}
    </>
  );
};
export default ActionButtons;
