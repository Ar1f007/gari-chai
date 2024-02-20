'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { routes } from '@/config/routes';
import { TCarCampaign } from '@/schema/campaign';
import { settingsActions } from '@/store';

type MakeOfferButtonProps = {
  // TODO
  //  | TCarCampaign['usedCars'][number]
  car: TCarCampaign['newCars'][number];
};

export const MakeOfferButton = (props: MakeOfferButtonProps) => {
  const router = useRouter();

  function handleOnClick() {
    settingsActions.setSelectedCar(props.car);

    router.push(routes.carCampaigns + '/' + props.car.slug);
  }

  return (
    <Button
      color='primary'
      variant='bordered'
      onClick={handleOnClick}
    >
      Make Offer
    </Button>
  );
};
