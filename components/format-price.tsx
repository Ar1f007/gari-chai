import { formatRangeToLakhCrore } from '@/lib/utils';
import { formatAsBangladeshiCurrency } from '@/util/covert-currency';

type FormatPriceProps = {
  min: number;
  max: number;
  type: 'number' | 'string';
};
export const FormatPrice = ({ min, max, type }: FormatPriceProps) => {
  if (min === max) {
    return formatAsBangladeshiCurrency(min);
  }

  if (type == 'number') {
    const minVal = formatAsBangladeshiCurrency(min);
    const maxVal = formatAsBangladeshiCurrency(max);

    return `${minVal} - ${maxVal}`;
  }

  return formatRangeToLakhCrore(min, max);
};
