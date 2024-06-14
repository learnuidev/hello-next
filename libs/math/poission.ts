import { factorial } from "./core";

export const poisson = (x: number, λ: number) =>
  (Math.exp(-1 * λ) * λ ** x) / factorial(x);
