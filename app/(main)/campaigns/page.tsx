import extendedDayjs from '@/lib/dayjs';

import { Section } from '@/components/layout/section';
import { title } from '@/components/primitives';
import { getCarsCampaign } from '@/services/campaign/car-campaign';
import CampaignCard from '@/modules/campaigns/campaign-card';

const CampaignsPage = async () => {
  const campaigns = await getCarsCampaign();

  if (!campaigns.data || !campaigns.data.length) {
    return (
      <Section classNames='py-10'>
        <h1
          className={title({
            size: 'sm',
            className: 'text-center font-normal md:mt-16',
            fullWidth: true,
          })}
        >
          No campaigns running at the moment.
        </h1>
      </Section>
    );
  }

  const currentDateTime = extendedDayjs(); // Assuming extendedDayjs() returns current date and time

  const validCampaigns = campaigns.data.filter((campaign) =>
    extendedDayjs(campaign.endDate).isSameOrAfter(currentDateTime),
  );

  return (
    <Section classNames='py-10 px-2'>
      {validCampaigns.map((campaign) => (
        <CampaignCard
          campaign={campaign}
          key={campaign._id}
        />
      ))}
    </Section>
  );
};
export default CampaignsPage;
