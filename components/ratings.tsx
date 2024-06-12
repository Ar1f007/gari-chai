import { EmptyStar, FilledStar, HalfStar } from './icons';

export const Ratings = ({
  stars,
  hideEmptyStar = false,
}: {
  stars: number;
  hideEmptyStar?: boolean;
}) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FilledStar />
        ) : stars >= number ? (
          <HalfStar />
        ) : hideEmptyStar ? null : (
          <EmptyStar />
        )}
      </span>
    );
  });

  return <div className='text-accent flex gap-0.5'>{tempStars}</div>;
};
