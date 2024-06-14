export const factorial = (n: number): number =>
  n < 2 ? n : n * factorial(n - 1);
