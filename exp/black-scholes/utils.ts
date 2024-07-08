import { IBlackScholes } from "./types";

// Helper function to calculate the cumulative normal distribution function (CDF)
function cumulativeNormalDistribution(x: number) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x) / Math.sqrt(2.0);

  const t = 1.0 / (1.0 + p * absX);
  const y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
  return 0.5 * (1.0 + sign * (1.0 - Math.exp(-absX * absX) * y));
}

// Black-Scholes Option Pricing Model in JavaScript

// Helper function to calculate d1 and d2
function getDelta({
  stockPrice,
  strikePrice,
  time,
  rate,
  sigma,
}: IBlackScholes) {
  return (
    (Math.log(stockPrice / strikePrice) +
      (rate + (sigma * sigma) / 2.0) * time) /
    (sigma * Math.sqrt(time))
  );
}
function calculateD1D2(props: IBlackScholes) {
  const { stockPrice, strikePrice, time, rate, sigma } = props;
  const d1 = getDelta({
    stockPrice,
    strikePrice,
    time,
    rate,
    sigma,
  });

  const d2 = d1 - sigma * Math.sqrt(time);
  return { d1, d2 };
}

export function getCallOptionPrice(props: IBlackScholes) {
  const { stockPrice, strikePrice, time, rate, sigma } = props;
  const { d1, d2 } = calculateD1D2({
    stockPrice,
    strikePrice,
    time,
    rate,
    sigma,
  });

  const N_d1 = cumulativeNormalDistribution(d1);
  const N_d2 = cumulativeNormalDistribution(d2);

  return stockPrice * N_d1 - strikePrice * Math.exp(-rate * time) * N_d2;
}

// Function to calculate the Black-Scholes option price
export function getPutOptionPrice(props: IBlackScholes) {
  const { stockPrice, strikePrice, time, rate, sigma } = props;
  const { d1, d2 } = calculateD1D2({
    stockPrice,
    strikePrice,
    time,
    rate,
    sigma,
  });

  const N_minusD1 = cumulativeNormalDistribution(-d1);
  const N_minusD2 = cumulativeNormalDistribution(-d2);
  return (
    strikePrice * Math.exp(-rate * time) * N_minusD2 - stockPrice * N_minusD1
  );
}
