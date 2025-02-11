'use client';

import { useFetchCarCampaignComments } from '@/hooks/useFetchCarCampaignComments';
import { cn } from '@/lib/utils';
import { campaignStore, settingsStore } from '@/store';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';
import { Avatar } from '@nextui-org/avatar';
import { BirdIcon, PinIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSnapshot } from 'valtio';

const CampaignComments = () => {
  const pathname = usePathname();

  const settingsSnap = useSnapshot(settingsStore);

  useFetchCarCampaignComments({
    campaignId: pathname.split('/')[2],
    carId: settingsSnap.currentlySelectedCar?.details._id!,
  });

  const campaignSnap = useSnapshot(campaignStore);

  return (
    <div className='xl:max-w-[500px]'>
      <div className='mb-6 min-h-[290px] rounded-lg border bg-default-50 p-5'>
        <h2 className='flex items-center justify-center gap-2'>
          <span className='inline-block text-2xl font-bold text-default-800'>Top Bidders </span>
          <PinIcon className='size-7 rotate-45 text-primary' />
        </h2>

        <ul className='mt-8 flex flex-col gap-5 xl:px-8'>
          {campaignSnap.comments.length === 0 ? (
            <li className='mt-8'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100'
                height='100'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='1'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-bird mx-auto'
                style={{ transform: 'rotateY(180deg)' }}
              >
                <path d='M16 7h.01' />
                <path d='M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20' />
                <path d='m20 7 2 .5-2 .5' />
                <path d='M10 18v3' />
                <path d='M14 17.75V21' />
                <path d='M7 18a6 6 0 0 0 3.84-10.61' />
              </svg>
            </li>
          ) : (
            campaignSnap.comments.slice(0, 3).map((item, idx) => (
              <li
                className='flex flex-wrap items-center justify-between gap-5'
                key={item._id}
              >
                <div className='flex items-center gap-4'>
                  <Avatar
                    src={item.user.profilePicture}
                    isBordered
                    color={idx == 0 ? 'primary' : idx == 1 ? 'secondary' : 'danger'}
                    name={item.user.firstName + item.user.lastName}
                    showFallback
                  />

                  <h3
                    className={cn(
                      'font-semibold',
                      idx == 0 ? 'text-primary' : idx == 1 ? 'text-secondary' : 'text-danger',
                    )}
                  >
                    {item.user.firstName} {item.user.lastName}
                  </h3>
                </div>

                <p className='font-bold text-primary'>
                  {formatAsBangladeshiCurrency(item.content)}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className='rounded-lg border px-2 py-5 shadow-sm md:p-5'>
        <div className='mb-2 rounded-md bg-primary-900 py-4 shadow-sm'>
          <h4 className='text-center text-xl font-bold text-primary'>Comments</h4>
        </div>
        <ul
          className={cn(
            'mt-3 flex h-full max-h-[285px] min-h-[285px] flex-col gap-2 overflow-y-auto',
            campaignSnap.comments.length > 4 && 'pr-3',
          )}
        >
          {campaignSnap.comments.length === 0 ? (
            <li className='mt-20'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100'
                height='100'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='1'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-bird mx-auto'
              >
                <path d='M16 7h.01' />
                <path d='M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20' />
                <path d='m20 7 2 .5-2 .5' />
                <path d='M10 18v3' />
                <path d='M14 17.75V21' />
                <path d='M7 18a6 6 0 0 0 3.84-10.61' />
              </svg>
            </li>
          ) : (
            campaignSnap.comments.map((item) => (
              <li
                className='flex flex-wrap items-center justify-between gap-5 rounded-md border bg-default-50 px-2 py-3 xl:px-8'
                key={item._id}
              >
                <div className='flex items-center gap-4'>
                  <Avatar
                    src={item.user.profilePicture}
                    name={item.user.firstName}
                    showFallback
                    isBordered
                  />

                  <h3 className='font-semibold'>
                    {item.user.firstName} {item.user.lastName}
                  </h3>
                </div>

                <p className='font-bold'>{formatAsBangladeshiCurrency(item.content)}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
export default CampaignComments;
