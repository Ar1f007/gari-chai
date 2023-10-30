import { homePageSectionNameEnum } from '@/lib/constants';
import { endpoints } from '../endpoints';
import { apiFetch } from '../apiFetch';
import { ReqMethod } from '../serviceHelper';
import { TAGS } from '../tags';
import { z } from 'zod';
import { homeSettingApiSchemaSingleInstance } from '@/schema/common';

export async function getHomePageLatestCars(sectionName: string) {
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
        tags: [TAGS.homeSettings.all, TAGS.homeSettings.latestCars],
      },
    });

    if (res.status === 'success') {
      const parsedData = z.array(homeSettingApiSchemaSingleInstance).safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }

      throw new Error('Home: Latest Cars data missing');
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}