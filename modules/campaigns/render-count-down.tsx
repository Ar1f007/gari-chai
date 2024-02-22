import extendedDayjs from '@/lib/dayjs';
import CountdownTimer from './countdown';

export const RenderCountDown = (campaign: { startDate: string; endDate: string }) => {
  const currentTime = extendedDayjs();

  if (currentTime.isBefore(extendedDayjs(campaign.startDate))) {
    return (
      <CountdownTimer
        text='Campaign starts in'
        date={campaign.startDate}
      />
    );
  } else if (currentTime.isBefore(extendedDayjs(campaign.endDate))) {
    return (
      <CountdownTimer
        text='Campaign ends in'
        date={campaign.endDate}
      />
    );
  } else {
    return null; // Both start and end dates are in the past, do not render the timer
  }
};
