import { Section } from '@/components/layout/section';
import CountdownTimer from '@/modules/campaigns/countdown';

const CampaignsPage = () => {
  return (
    <Section classNames='py-10'>
      <CountdownTimer
        text='Campaign Starts in'
        time=''
      />
    </Section>
  );
};
export default CampaignsPage;
