export const MAX_AMOUNT = 10_000_000;
export function parseAmount(value) {
  const normalized = String(value).replace(/[۰-۹]/g, c => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/[,٬\s]/g, '');
  if (!/^\d+$/.test(normalized)) return null;
  const n = Number(normalized);
  return Number.isSafeInteger(n) && n <= MAX_AMOUNT ? n : null;
}
export function calculate({ agency, total, fee, expense }) {
  const received = parseAmount(total), cost = parseAmount(expense);
  const serviceFee = agency ? parseAmount(fee) : received;
  if (received === null || cost === null || serviceFee === null || serviceFee > received) return null;
  return { received, serviceFee, passThrough: agency ? received - serviceFee : 0, relatedExpenses: cost, illustrativeSurplus: serviceFee - cost };
}
export const format = n => new Intl.NumberFormat('fa-IR').format(n);
