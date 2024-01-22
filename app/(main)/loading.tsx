import { Spinner } from '@nextui-org/spinner';

const Loading = () => {
  return (
    <div className='flex h-[calc(100vh_-_300px)] items-center justify-center'>
      <Spinner
        size='md'
        color='primary'
      />
    </div>
  );
};

export default Loading;
