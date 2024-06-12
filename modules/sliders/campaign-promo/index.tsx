import { getCarsCampaign } from '@/services/campaign/car-campaign';
import CampaignSlider from './slider';

const CampaignPromo = async () => {
  const campaigns = await getCarsCampaign();

  if (!campaigns.data || !campaigns.data.length) return null;

  return <CampaignSlider sliders={campaigns.data} />;
};
export default CampaignPromo;
