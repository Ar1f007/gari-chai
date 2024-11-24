'use client';

import { subtitle, title } from '@/components/primitives';
import { cn } from '@/lib/utils';
import { TCarCampaign } from '@/schema/campaign';
import { RenderCountDown } from './render-count-down';
import CampaignCars from './campaign-cars';
import extendedDayjs from '@/lib/dayjs';
import { useEffect, useState } from 'react';

const CampaignCard = ({ campaign }: { campaign: TCarCampaign }) => {
  const currentTime = extendedDayjs();

  const [rerender, setRerender] = useState(false); // State to trigger rerender

  const handleCountdownFinish = () => {
    setRerender(true);
  };

  useEffect(() => {
    setRerender(false);
  }, [rerender]);

  const isValid =
    currentTime.isBefore(extendedDayjs(campaign.startDate)) ||
    currentTime.isBefore(extendedDayjs(campaign.endDate));

  if (!isValid) {
    return null;
  }

  return (
    <div
      className='rounded-md border bg-default-50 mt-12 px-4 md:px-0 py-8 shadow-md'
      key={campaign._id}
    >
      <h1
        className={title({
          size: 'sm',
          fullWidth: true,
          color: 'pink',
          className: cn('mb-3 text-center capitalize', !campaign.tagline && 'mb-6'),
        })}
      >
        {campaign.title}
      </h1>

      {campaign.tagline && (
        <p className={subtitle({ className: 'mb-5 text-center' })}>{campaign.tagline}</p>
      )}

      <RenderCountDown
        key={campaign._id}
        startDate={campaign.startDate}
        endDate={campaign.endDate}
        onCountdownFinish={handleCountdownFinish}
      />

      <CampaignCars campaign={campaign} />
    </div>
  );
};
export default CampaignCard;
