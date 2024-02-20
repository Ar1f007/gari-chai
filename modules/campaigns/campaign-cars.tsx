import { TCarCampaign } from '@/schema/campaign';
import { CampaignCarCard } from './campaign-car';

type CampaignCarsProps = {
  newCars: TCarCampaign['newCars'];
  usedCars: TCarCampaign['usedCars'];
};

const CampaignCars = ({ newCars, usedCars }: CampaignCarsProps) => {
  return (
    <ul className='my-16 flex flex-wrap justify-center gap-5 sm:*:basis-1/2 md:*:basis-1/3 xl:gap-10 xl:px-8 xl:*:basis-1/4'>
      {newCars.map((car) => (
        <li key={car._id}>
          <CampaignCarCard car={car} />
        </li>
      ))}
    </ul>
  );
};
export default CampaignCars;
