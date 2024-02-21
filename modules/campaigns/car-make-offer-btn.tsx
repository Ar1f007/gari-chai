'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { routes } from '@/config/routes';
import { TCarCampaign } from '@/schema/campaign';
import { settingsActions } from '@/store';
import { createUrl } from '@/lib/utils';

type MakeOfferButtonProps = {
  // TODO
  //  | TCarCampaign['usedCars'][number]
  car: TCarCampaign['newCars'][number]['car'];
  campaignPrice: TCarCampaign['newCars'][number]['campaignPrice'];
};

export const MakeOfferButton = (props: MakeOfferButtonProps) => {
  const router = useRouter();

  function handleOnClick() {
    settingsActions.setSelectedCar({
      details: props.car,
      campaignPrice: props.campaignPrice,
    });

    const params = new URLSearchParams();

    params.append('type', props.car.carType == 'new' ? 'new-car' : 'used-car');
    params.append('priceMin', props.campaignPrice.min.toString());
    params.append('priceMax', props.campaignPrice.max.toString());

    router.push(createUrl(routes.carCampaigns + '/' + props.car.slug, params));
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
