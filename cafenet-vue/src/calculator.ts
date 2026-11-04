export function parseAmount(value: unknown): number | null {
  const s = String(value ?? '').replace(/[۰-۹]/g, c => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/[٠-٩]/g, c => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/[,٬\s]/g, '')
  if (!/^\d+$/.test(s)) return null
  const n = Number(s)
  return Number.isSafeInteger(n) && n <= 10000000 ? n : null
}
export function calculate(agency: boolean, total: unknown, fee: unknown, expense: unknown) {
  const received = parseAmount(total), cost = parseAmount(expense), serviceFee = agency ? parseAmount(fee) : received
  if (received === null || cost === null || serviceFee === null || serviceFee > received) return null
  return { received, serviceFee, passThrough: agency ? received - serviceFee : 0, cost, surplus: serviceFee - cost }
}
export const format = (n: number) => new Intl.NumberFormat('fa-IR').format(n)
