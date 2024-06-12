import { title } from '@/components/primitives';
import { TCarSchema } from '@/schema/car';
import CommentForm from './comment-form';
import CommentList from './comment-list';

const Comments = ({ carId }: { carId: TCarSchema['_id'] }) => {
  return (
    <section className='mt-8 max-w-5xl rounded-xl bg-foreground-50 p-6'>
      <h2 className={title({ size: 'xs' })}>Write your comments and asking</h2>

      <div className='mt-8'>
        <CommentForm
          car={carId}
          isEditing={false}
          isChild={false}
        />
      </div>

      <CommentList carId={carId} />
    </section>
  );
};
export default Comments;
