const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0, // Ensures at least two decimal places
  maximumFractionDigits: 0, // Ensures at most two decimal places
});

export const formatPrice = (value: number) => {
  return priceFormatter.format(value / 100);
};
