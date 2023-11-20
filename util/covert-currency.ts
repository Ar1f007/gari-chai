export function formatAsBangladeshiCurrency(number: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    maximumSignificantDigits: 3,
  }).format(number);
}
