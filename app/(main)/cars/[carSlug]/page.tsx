import KeySpecs from '@/modules/car/key-specs';
import CarImage from '@/modules/car/new-car/car-image';
import CarInfo from '@/modules/car/new-car/car-info';
import Reviews from '@/modules/car/reviews';

import {getCarBySlug} from '@/services/car/getCarBySlug';
import {notFound} from 'next/navigation';

type Props = {
    params: {
        carSlug: string;
    };
};

export default async function CarDetailsPage(props: Props) {
    const {
        params: {carSlug},
    } = props;

    const car = await getCarBySlug({
        slug: carSlug,
        carType: 'new-car',
    });

    if (!car) {
        notFound();
    }

    return (
        <div>
            <div className='flex flex-col gap-5 xl:flex-row xl:gap-10'>
                <CarImage car={car}/>
                <CarInfo car={car}/>
            </div>

            <KeySpecs car={car}/>

            <Reviews car={car}/>
        </div>
    );
}
