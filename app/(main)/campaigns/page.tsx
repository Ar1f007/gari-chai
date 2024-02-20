import { Car } from '@/components/car/new-car-card';
import { Section } from '@/components/layout/section';
import { subtitle, title } from '@/components/primitives';
import CampaignCars from '@/modules/campaigns/campaign-cars';
import CountdownTimer from '@/modules/campaigns/countdown';
import { getCarsCampaign } from '@/services/campaign/car-campaign';

const CampaignsPage = async () => {
  const campaigns = await getCarsCampaign();

  if (!campaigns.data || !campaigns.data.length) {
    return (
      <Section classNames='py-10'>
        <h1 className={title({ size: 'sm', className: 'text-center' })}>
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
              color: 'green',
              className: 'mb-3 text-center',
            })}
          >
            Special Summer Sale
          </h1>
          <p className={subtitle({ className: 'mb-5 text-center' })}>Tagline Goes Here</p>
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
