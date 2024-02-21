'use client';

import { RHFInput } from '@/components/form/RHFInput';
import { FormatPrice } from '@/components/format-price';
import { routes } from '@/config/routes';
import { useFetchCarCampaignComments } from '@/hooks/useFetchCarCampaignComments';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import { CarCampaignCommentInputs, carCampaignCommentSchema } from '@/schema/comment';
import { createNewCampaignComment } from '@/services/campaign/car-comment';
import { settingsStore, userStore } from '@/store';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';
import { mapValidationErrors } from '@/util/mapValidationError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSnapshot } from 'valtio';

export const CampaignCommentForm = () => {
  const userSnap = useSnapshot(userStore);
  const settingsSnap = useSnapshot(settingsStore);

  const router = useRouter();
  const pathname = usePathname();

  const { refetch } = useFetchCarCampaignComments({
    campaignId: pathname.split('/')[2],
    carId: settingsSnap.currentlySelectedCar?.details._id!,
  });

  const form = useForm<CarCampaignCommentInputs>({
    resolver: zodResolver(carCampaignCommentSchema),
  });

  function redirectToLogin() {
    const params = new URLSearchParams();
    params.set('pathname', pathname);

    const url = encodeURI(createUrl(routes.login, params));
    toast.error('Please login to continue', {
      action: {
        label: 'Go to Login',
        onClick: () => router.push(url),
      },
    });
  }

  async function onSubmit(data: CarCampaignCommentInputs) {
    if (userSnap.status !== 'loggedIn') {
      return redirectToLogin();
    }

    if (!settingsSnap.currentlySelectedCar) {
      return redirect(routes.campaigns);
    }

    if (
      +data.amount > settingsSnap.currentlySelectedCar.campaignPrice.max ||
      +data.amount < settingsSnap.currentlySelectedCar.campaignPrice.min
    ) {
      const sameVal =
        settingsSnap.currentlySelectedCar.campaignPrice.max ===
        settingsSnap.currentlySelectedCar.campaignPrice.min;

      form.setError('amount', {
        message: sameVal
          ? 'Amount must be ' +
            formatAsBangladeshiCurrency(settingsSnap.currentlySelectedCar.campaignPrice.max)
          : 'Amount should be between ' +
            formatAsBangladeshiCurrency(settingsSnap.currentlySelectedCar.campaignPrice.min) +
            ' and ' +
            formatAsBangladeshiCurrency(settingsSnap.currentlySelectedCar.campaignPrice.max)
              .replace('BDT', '')
              .trim(),
      });
      return;
    }

    const campaignId = pathname.split('/')[2];

    const payload = {
      content: +data.amount,
      user: userSnap.user?._id,
      campaign: campaignId,
      carType: settingsSnap.currentlySelectedCar.details.carType,
      car: settingsSnap.currentlySelectedCar.details._id,
    };

    const res = await createNewCampaignComment(payload);

    if (!res) {
      toast.error(GENERIC_ERROR_MSG);
      return;
    }

    if (res.status == 'success') {
      await refetch();
      form.reset();
      return;
    }

    if (res.status == 'validationError') {
      toast.error(res.message);
      mapValidationErrors(res.errors, form);
      return;
    }

    toast.error(res.message);
  }

  if (!settingsSnap.currentlySelectedCar) return;

  const campaignMinPrice = settingsSnap.currentlySelectedCar.campaignPrice.min;
  const campaignMaxPrice = settingsSnap.currentlySelectedCar.campaignPrice.max;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label
          htmlFor='bid'
          className='mb-2 block text-sm font-semibold'
        >
          *You can make an offer {campaignMinPrice === campaignMaxPrice ? 'from' : 'between'}
          <span className='font-bold text-primary'>
            &nbsp; (
            <FormatPrice
              min={campaignMinPrice}
              max={campaignMaxPrice}
              type='number'
            />
            )
          </span>
        </label>
        <RHFInput
          id='bid'
          name='amount'
          isRequired
          inputMode='numeric'
          classNames={{
            label: 'font-semibold text-lg',
            errorMessage: 'text-md',
            description: 'text-md text-default-700',
          }}
          placeholder='eg: 350000'
          autoFocus
        />

        <Button
          color='primary'
          variant='solid'
          className='mt-4 w-full text-lg tracking-wider text-default-50 shadow-sm'
          size='lg'
          type='submit'
          isLoading={form.formState.isSubmitting}
          isDisabled={form.formState.isSubmitting}
        >
          Submit Your Offer
        </Button>
      </form>
    </FormProvider>
  );
};
