import SectionTitle from '@/components/section-title';

import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { THomeSettingApiSchemaSingleInstance } from '@/schema/common';
import { getHomePageCarsBySection } from '@/services';
import { TabSlider } from './TabSlider';
import Link from 'next/link';
import { routes } from '@/config/routes';

function groupCarsByTag(
  cars: THomeSettingApiSchemaSingleInstance[],
): { name: string; items: THomeSettingApiSchemaSingleInstance[] }[] {
  const groupedCars: { [key: string]: THomeSettingApiSchemaSingleInstance[] } = {};

  // Group cars by tags
  for (const car of cars) {
    for (const tag of car.tags) {
      if (!groupedCars[tag]) {
        groupedCars[tag] = [];
      }
      groupedCars[tag].push(car);
    }
  }

  // Convert the grouped data into the desired format
  const result: { name: string; items: THomeSettingApiSchemaSingleInstance[] }[] = [];
  for (const tag in groupedCars) {
    let tagName = tag.split('-')[0];

    result.push({ name: tagName, items: groupedCars[tag] });
  }

  return result;
}

export const ElectricCars = async () => {
  const res = await getHomePageCarsBySection(HOME_SETTINGS_OPTIONS.electricCars);

  if (!res || res.length === 0) return null;

  const groupedCars = groupCarsByTag(res);

  return (
    <section className='home-section-wrapper'>
      <SectionTitle title='h2'>Electric Cars</SectionTitle>

      <TabSlider data={groupedCars} />

      <Link
        href={routes.electricCars}
        className='mt-2 flex gap-2 text-primary underline-offset-4 hover:underline'
      >
        <span>View all electric cars</span>
      </Link>
    </section>
  );
};
