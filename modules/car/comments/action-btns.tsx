'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@nextui-org/button';
import { EditIcon, ReplyAllIcon, ReplyIcon } from 'lucide-react';

import { CommentBody } from '@/schema/comment';
import CommentForm from './comment-form';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store';

type Props = {
  comment: CommentBody;
  children: ReactNode;
};
const ActionButtons = ({ comment, children }: Props) => {
  const userSnap = useSnapshot(userStore);

  const [showReplies, setShowReplies] = useState(false);
  const [commentForm, setShowCommentForm] = useState(false);
  const [editCommentForm, setEditCommentForm] = useState(false);

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

  return (
    <>
      <div className='flex items-center'>
        {comment.depth === 0 && (
          <Button
            size='sm'
            variant='light'
            onPress={showCommentForm}
          >
            <ReplyIcon
              className='text-default-500'
              size={18}
            />{' '}
            Reply
          </Button>
        )}

        {comment.children.length > 0 && (
          <Button
            variant='light'
            size='sm'
            onPress={toggleShowRepliesVisibility}
          >
            <ReplyAllIcon
              className='text-default-500'
              size={18}
            />
            {comment.children.length} replies
          </Button>
        )}

        {userSnap.user && userSnap.user._id === comment.user._id && (
          <Button
            variant='light'
            size='sm'
            onPress={handleEditComment}
          >
            <EditIcon
              className='text-default-500'
              size={18}
            />{' '}
            Edit
          </Button>
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
