import { Section } from '@/components/layout/section';
import { subtitle, title } from '@/components/primitives';
import extendedDayjs from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import CampaignCars from '@/modules/campaigns/campaign-cars';
import CountdownTimer from '@/modules/campaigns/countdown';
import { RenderCountDown } from '@/modules/campaigns/render-count-down';
import { getCarsCampaign } from '@/services/campaign/car-campaign';

const CampaignsPage = async () => {
  const campaigns = await getCarsCampaign();

  if (!campaigns.data || !campaigns.data.length) {
    return (
      <Section classNames='py-10'>
        <h1 className={title({ size: 'sm', className: 'text-center', fullWidth: true })}>
          No Campaigns Running At the Moment.
        </h1>
      </Section>
    );
  }

  return (
    <Section classNames='py-10 px-2'>
      {campaigns.data.map((campaign) => (
        <div
          className='mt-12 rounded-md bg-default-50 py-8 shadow-lg'
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
            startDate={campaign.startDate}
            endDate={campaign.endDate}
          />

          <CampaignCars campaign={campaign} />
        </div>
      ))}
    </Section>
  );
};
export default CampaignsPage;
