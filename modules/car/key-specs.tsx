import {MileageIcon} from '@/components/icons';
import {title} from '@/components/primitives';
import {TCarSchema} from '@/schema/car';
import {FuelIcon, Settings as SettingsIcon, UtilityPoleIcon} from 'lucide-react';
import KeySpec from './key-spec';
import AdditionalSpecifications from './additional-specs';

type Props = {
    car: TCarSchema;
};
const KeySpecs = ({car}: Props) => {
    return (
        <article className='mt-8 rounded-xl bg-foreground-50 p-6'>
            <h2 className={title({size: 'xs'})}>
                Key Specs of <span className='capitalize'>{car.name}</span>
            </h2>

            <div className='mt-12 flex flex-col gap-8'>
                <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-45'>
                    {/* Engine */}
                    <KeySpec
                        icon={SettingsIcon}
                        propertyName='Engine'
                        value={car.engine.type}
                    />

                    {/* Fuel */}
                    <KeySpec
                        icon={FuelIcon}
                        propertyName='Fuel'
                        value={car.fuel.type}
                    />

                    {/* Transmission */}
                    <KeySpec
                        icon={UtilityPoleIcon}
                        propertyName='Transmission'
                        value={car.transmission}
                    />

                    {/* Mileage */}
                    <KeySpec
                        icon={MileageIcon}
                        propertyName='Mileage'
                        value={car.mileage + ' kmpl'}
                    />
                </div>
                <div className='h-[2px] w-full bg-gray-300'/>

                <AdditionalSpecifications car={car}/>
            </div>
        </article>
    );
};
export default KeySpecs;
