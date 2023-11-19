import { TCarSchema } from '@/schema/car';
import { commentService } from '@/services/comments';
import CommentItem from './comment-item';

const CommentList = async ({ carId }: { carId: TCarSchema['_id'] }) => {
  const comments = await commentService.getComments({ carId });

  if (!comments) return null;

  if (typeof comments === 'string') {
    return <p className='text-center text-3xl text-danger'>{comments}</p>;
  }

  return (
    <ul className='flex flex-col gap-y-5  py-10'>
      {comments.map((comment) => (
        <li key={comment._id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};
export default CommentList;
