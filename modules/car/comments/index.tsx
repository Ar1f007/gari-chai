import { title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import { commentService } from '@/services/comments';
import CommentForm from './comment-form';

const Comments = async ({ carId }: { carId: TCarSchema['_id'] }) => {
  console.log(carId);
  const comments = await commentService.getComments({ carId });
  console.log(comments);

  return (
    <section className='mt-8 max-w-5xl rounded-xl bg-foreground-50 p-6'>
      <h2 className={title({ size: 'xs' })}>Write your comments and asking</h2>
      <CommentForm
        car={carId}
        isEditing={false}
        isChild={false}
      />
    </section>
  );
};
export default Comments;
