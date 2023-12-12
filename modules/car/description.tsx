const CarDescription = ({ text }: { text: string }) => {
  return (
    <div className='mt-8 flex flex-col space-y-4 rounded-xl bg-foreground-50 p-6'>
      <p>{text}</p>
    </div>
  );
};
export default CarDescription;
