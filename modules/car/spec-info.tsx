type SpecInfoProps = {
  name: string;
  value: string | number;
};
const SpecInfo = (props: SpecInfoProps) => {
  return (
    <div className='flex items-center gap-5'>
      <h4 className='whitespace-nowrap text-base text-default-500'>{props.name}</h4>
      <p className='text-base font-medium'>{props.value}</p>
    </div>
  );
};
export default SpecInfo;
