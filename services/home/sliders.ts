import { z } from 'zod';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { TAGS } from '../tags';
import { TSlider, sliderSchema } from '@/schema/slider';

export async function getSliders() {
  try {
    const url = endpoints.api.sliders.baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,
      next: {
        tags: [TAGS.sliders],
        revalidate: 0, // revalidate every day
      },
    });

    if (res.status === 'success') {
      const parsedData = z.array(sliderSchema).safeParse(res.data);

      if (parsedData.success) {
        const sliders = parsedData.data.reduce(
          (acc, cur) => {
            if (cur.status === 'hidden') return acc;

            if (cur.type === 'desktop') {
              acc.desktopSliders.push(cur);
            } else {
              acc.mobileSliders.push(cur);
            }

            return acc;
          },
          {
            desktopSliders: [],
            mobileSliders: [],
          } as {
            desktopSliders: TSlider[];
            mobileSliders: TSlider[];
          },
        );

        return sliders;
      } else {
        return null;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
