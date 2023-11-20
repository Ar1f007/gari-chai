import SectionTitle from '@/components/section-title';

import { HOME_SETTINGS_OPTIONS } from '@/lib/constants';
import { THomeSettingApiSchemaSingleInstance } from '@/schema/common';
import { getHomePageCarsBySection } from '@/services';
import { TabSlider } from './TabSlider';

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
    <section className='mt-4 rounded-xl bg-background px-2 py-8 md:mt-16 md:shadow-md'>
      <SectionTitle>Electric Cars</SectionTitle>

      <TabSlider data={groupedCars} />
    </section>
  );
};
