type SpecInfoProps = {
  name: string;
  value: string | number;
};
const SpecInfo = (props: SpecInfoProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-5'>
        <h4 className='whitespace-nowrap text-base text-default-500'>{props.name}</h4>
        <p className='text-base font-medium'>{props.value}</p>
      </div>
      <div className='border-b-1 border-solid border-gray-200' />
    </div>
  );
};
export default SpecInfo;
