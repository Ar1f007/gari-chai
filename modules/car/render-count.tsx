const RenderCount = ({ count, text }: { count: number; text: string }) => {
  return (
    <p className='ms-2 text-small font-medium text-foreground'>
      +{count} {text}
    </p>
  );
};
export default RenderCount;
