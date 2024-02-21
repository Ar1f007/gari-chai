export function formatAsBangladeshiCurrency(number: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
  }).format(number);
}
