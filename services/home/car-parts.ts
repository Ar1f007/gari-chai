import { z } from 'zod';
import { homePageSectionNameEnum } from '@/lib/constants';
import { endpoints } from '../endpoints';
import { apiFetch } from '../apiFetch';
import { ReqMethod } from '../serviceHelper';
import { TAGS } from '../tags';
import { homeCarPartSchemaSingleInstance } from '@/schema';

export async function getHomePageCarPartsBySectionName(sectionName: string) {
  const parsedSectionName = homePageSectionNameEnum.safeParse(sectionName);

  if (!parsedSectionName.success) {
    const errMessages = parsedSectionName.error.errors.map((e) => e.message);
    throw new Error(errMessages.toString());
  }

  try {
    const url = endpoints.api.homeSettings.baseUrl + '/' + sectionName;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,
      next: {
        tags: [TAGS.homeSettings.all, sectionName],
      },
    });

    console.log('=======================CAR PARTS RESPONSE===========', res);

    if (res.status === 'success') {
      const parsedData = z.array(homeCarPartSchemaSingleInstance).safeParse(res.data);

      if (parsedData.success) {
        console.log('=============SUCCESS DATA============', parsedData);
        return parsedData.data;
      }

      console.log(
        '==========ERROR DATA===========',
        parsedData.error.errors.map((e) => e.message),
      );

      throw new Error(`Home: ${sectionName} data missing`);
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}
