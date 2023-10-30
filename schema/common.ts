import { homePageSectionNameEnum } from '@/lib/constants';
import { z } from 'zod';
import { carSchema } from './car';

export const homeSettingApiSchemaSingleInstance = z.object({
  _id: z.string(),
  sectionName: homePageSectionNameEnum,
  content: carSchema,
  tags: z.array(z.string()),
  sort: z.number(),
  contentId: z.string(),
});

export type THomeSettingApiSchemaSingleInstance = z.infer<
  typeof homeSettingApiSchemaSingleInstance
>;
