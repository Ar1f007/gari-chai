import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { TAGS } from '../tags';

type Brand = {
  _id: string;
  name: string;
  slug: string;
};

export type BrandsWithSections = {
  popularBrands: Brand[];
  allBrands: Brand[];
};

export async function getAllAndPopularBrands() {
  const url = endpoints.api.brand.allAndPopularBrands;

  return apiFetch<BrandsWithSections>(url, {
    method: ReqMethod.GET,
    next: {
      tags: [TAGS.allAndPopularBrands],
      revalidate: 3600 * 12, // every 12 hour
    },
  });
}
