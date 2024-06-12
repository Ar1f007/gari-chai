import { Avatar } from '@nextui-org/avatar';

import ActionButtons from './action-btns';
import { CommentBody } from '@/schema/comment';
import { convertHtmlToText } from '@/util/html-to-text';
import { formatTimeFromNow } from '@/util/date-time';

const CommentItem = ({ comment }: { comment: CommentBody }) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-3'>
        <Avatar
          src={comment.user.profilePicture}
          alt={comment.user.firstName}
          size='md'
        />

        <div className='flex flex-col'>
          <h4 className='text-base font-medium capitalize light:text-gray-700 dark:text-default-500'>
            {comment.user.firstName} {comment.user.lastName}
          </h4>
          <p className='text-sm text-gray-500'>{formatTimeFromNow(comment.updatedAt)}</p>
        </div>
      </div>
      <div className='line-clamp-4 leading-relaxed text-default-600'>
        {convertHtmlToText(comment.content)}
      </div>

      <ActionButtons comment={comment}>
        {comment.children.length > 0 && (
          <ul className='mt-2 flex flex-col gap-y-5 border-l-1 pl-4 md:pl-6'>
            {comment.children.map((childComment) => (
              <CommentItem
                key={childComment._id}
                comment={childComment}
              />
            ))}
          </ul>
        )}
      </ActionButtons>
    </div>
  );
};
export default CommentItem;
