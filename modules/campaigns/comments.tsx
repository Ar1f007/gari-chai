import { cn } from '@/lib/utils';
import { Avatar } from '@nextui-org/avatar';
import { PinIcon } from 'lucide-react';

const CampaignComments = () => {
  return (
    <div className='max-w-[500px]'>
      <div className='mb-4 min-h-64 rounded-lg border bg-default-50 p-5'>
        <h2 className='flex items-center justify-center gap-2'>
          <span className='inline-block text-2xl font-bold text-default-800'>Top Bidders </span>
          <PinIcon className='size-7 rotate-45 text-primary' />
        </h2>

        <ul className='mt-4 flex flex-col gap-5 xl:px-8'>
          <li className='flex flex-wrap items-center justify-between gap-5'>
            <div className='flex items-center gap-4'>
              <Avatar
                src='https://i.pravatar.cc/150?u=a04258114e29026702d'
                isBordered
                color='primary'
                name='Joe'
                showFallback
              />

              <h3 className='font-semibold text-primary'>Johannah Jones</h3>
            </div>

            <p className='font-bold text-primary'>50.00 Lakh</p>
          </li>

          <li className='flex flex-wrap items-center justify-between gap-5'>
            <div className='flex items-center gap-4'>
              <Avatar
                src='https://i.pravatar.cc/150?u=a04258114e29026702d'
                isBordered
                color='secondary'
                name='Joe'
                showFallback
              />

              <h3 className='font-semibold text-secondary'>Henna Jones</h3>
            </div>

            <p className='font-bold text-secondary'>20.00 Lakh</p>
          </li>

          <li className='flex flex-wrap items-center justify-between gap-5'>
            <div className='flex items-center gap-4'>
              <Avatar
                src='https://i.pravatar.cc/150?u=a04258114e29026702d'
                isBordered
                color='danger'
                name='Joe'
                showFallback
              />

              <h3 className='font-semibold text-danger'>Henna Jones</h3>
            </div>

            <p className='font-bold text-danger'>10.3 Lakh</p>
          </li>
        </ul>
      </div>
      <div className='h-fit rounded-lg border px-2 py-5 shadow-sm md:p-5'>
        <div className='mb-2 rounded-md bg-primary-900 py-4 shadow-sm'>
          <h4 className='text-center text-xl font-bold text-primary'>Comments</h4>
        </div>
        <ul
          className={cn('mt-3 flex max-h-[350px] flex-col gap-2 overflow-y-auto', false && 'pr-3')}
        >
          {[0, 1, 2, 3].map((item) => (
            <li
              className='flex flex-wrap items-center justify-between gap-5 rounded-md border bg-default-50 px-2 py-3 xl:px-8'
              key={item}
            >
              <div className='flex items-center gap-4'>
                <Avatar
                  src='https://i.pravatar.cc/150?u=a04258114e29026702d'
                  name='Joe'
                  showFallback
                  isBordered
                />

                <h3 className='font-semibold'>Henna Jones</h3>
              </div>

              <p className='font-bold'>50.00 Lakh</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CampaignComments;
