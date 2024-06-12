import { TCarCampaign } from '@/schema/campaign';
import { CampaignCarCard } from './campaign-car';

type CampaignCarsProps = {
  campaign: TCarCampaign;
};

const CampaignCars = ({ campaign: { newCars, usedCars, _id } }: CampaignCarsProps) => {
  return (
    <ul className='mb-8 mt-8 flex flex-wrap justify-center gap-5 sm:*:basis-1/3 xl:mt-16 xl:gap-10 xl:px-8 xl:*:basis-1/4'>
      {newCars.map((item) => (
        <li key={item.car._id}>
          <CampaignCarCard
            campaignId={_id}
            campaignPrice={item.campaignPrice}
            car={item.car}
          />
        </li>
      ))}
    </ul>
  );
};
export default CampaignCars;
