import { Section } from '@/components/layout/section';

const CampaignCommentPageSkeleton = () => {
  return (
    <Section classNames='py-10 px-2'>
      <div className='container mx-auto min-h-[65vh] max-w-5xl rounded-md border p-5 shadow-md'>
        <div className='flex flex-col gap-5 *:flex-1 md:flex-row'>
          <div className='h-full w-full space-y-10 xl:max-w-[500px]'>
            <div className='h-[40vh] animate-pulse rounded-md bg-gray-300'></div>
            <div className='h-[15vh] animate-pulse rounded-md bg-gray-300'></div>
          </div>

          <div className='h-full w-full space-y-10'>
            <div className='h-[20vh] animate-pulse rounded-md bg-gray-300'></div>
            <div className='h-[35vh] animate-pulse rounded-md bg-gray-300'></div>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default CampaignCommentPageSkeleton;
