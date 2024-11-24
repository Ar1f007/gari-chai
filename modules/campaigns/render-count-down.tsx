'use client';

import extendedDayjs from '@/lib/dayjs';
import { Countdown } from './countdown';

export const RenderCountDown = (campaign: {
  startDate: string;
  endDate: string;
  onCountdownFinish: () => void;
}) => {
  const currentTime = extendedDayjs();

  if (currentTime.isBefore(extendedDayjs(campaign.startDate))) {
    return (
      <Countdown
        text='Campaign starts in'
        targetDate={new Date(campaign.startDate)}
        onComplete={campaign.onCountdownFinish}
      />
    );
  } else if (currentTime.isBefore(extendedDayjs(campaign.endDate))) {
    return (
      <Countdown
        text='Campaign ends in'
        targetDate={new Date(campaign.endDate)}
        onComplete={campaign.onCountdownFinish}
      />
    );
  } else {
    return null; // Both start and end dates are in the past, do not render the timer
  }
};
