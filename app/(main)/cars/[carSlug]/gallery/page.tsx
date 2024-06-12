import MediaGallery from '@/modules/car/media-gallery/media-gallery';
import { getCarBySlug } from '@/services/car/getCarBySlug';
import { notFound } from 'next/navigation';

type CarMediaGallery = {
  params: {
    carSlug: string;
  };
};

const CarMediaGalleryPage = async ({ params: { carSlug } }: CarMediaGallery) => {
  const car = await getCarBySlug({
    slug: carSlug,
    carType: 'new-car',
  });

  if (!car) {
    notFound();
  }

  return <MediaGallery car={car} />;
};
export default CarMediaGalleryPage;
