import { TCarSchema } from '@/schema/car';
import { fetchFilteredCars } from '@/services/search';
import { ReadonlyURLSearchParams } from 'next/navigation';

const QueryResults = async (props: { query: URLSearchParams | ReadonlyURLSearchParams }) => {
  const results = await fetchFilteredCars(props.query);

  if (typeof results === 'string') {
    return <p>{results}</p>;
  }

  return (
    <div>
      Grid
      {JSON.stringify(results)}
    </div>
  );
};
export default QueryResults;
