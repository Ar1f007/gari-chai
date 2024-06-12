import ColorSlider from '@/modules/car/color-slider';
import { getCarBySlug } from '@/services/car/getCarBySlug';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    carSlug: string;
  };
};

export default async function ColorsPage(props: Props) {
  const {
    params: { carSlug },
  } = props;

  const car = await getCarBySlug({
    slug: carSlug,
    carType: 'new-car',
  });

  if (!car) {
    notFound();
  }
  return <ColorSlider car={car} />;
}
