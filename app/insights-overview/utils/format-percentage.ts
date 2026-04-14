export function formatPercentage(number: number, maxMinDigits = 1) {
  return Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: maxMinDigits,
    maximumFractionDigits: maxMinDigits,
  }).format(number);
}
