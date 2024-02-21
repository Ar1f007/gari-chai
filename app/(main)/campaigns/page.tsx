import { Section } from '@/components/layout/section';
import { subtitle, title } from '@/components/primitives';
import { cn } from '@/lib/utils';
import CampaignCars from '@/modules/campaigns/campaign-cars';
import CountdownTimer from '@/modules/campaigns/countdown';
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
    <Section classNames='py-10'>
      {campaigns.data.map((campaign) => (
        <div
          className='mt-8 rounded-md bg-default-50 py-5 shadow-lg'
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

          <CountdownTimer
            text='Campaign Starts in'
            campaignTime=''
          />

          <CampaignCars
            newCars={campaign.newCars}
            usedCars={campaign.usedCars}
          />
        </div>
      ))}
    </Section>
  );
};
export default CampaignsPage;
