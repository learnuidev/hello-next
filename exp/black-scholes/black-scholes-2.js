// Black-Scholes Option Pricing Model in JavaScript

// Helper function to calculate the cumulative normal distribution function (CDF)
function cumulativeNormalDistribution(x) {
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
function getDelta({ stockPrice, strikePrice, time, rate, sigma }) {
  return (
    (Math.log(stockPrice / strikePrice) +
      (rate + (sigma * sigma) / 2.0) * time) /
    (sigma * Math.sqrt(time))
  );
}
function calculateD1D2(props) {
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

function getCallOptionPrice(props) {
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
function getPutOptionPrice(props) {
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

// Function to calculate the Black-Scholes option price
function blackScholes(props) {
  const {
    stockPrice,
    strikePrice,
    time,
    rate,
    sigma,
    optionType = "call",
  } = props;

  if (optionType === "call") {
    return getCallOptionPrice({
      stockPrice,
      strikePrice,
      time,
      rate,
      sigma,
    });
  } else {
    return getPutOptionPrice({
      stockPrice,
      strikePrice,
      time,
      rate,
      sigma,
    });
  }
}

// Example usage
const stockPrice = 100; // Current stock price
const strikePrice = 100; // Strike price
const time = 1; // Time to maturity in years
const rate = 0.05; // Risk-free interest rate
const sigma = 0.2; // Volatility

const callPrice = blackScholes({
  stockPrice,
  strikePrice,
  time,
  rate,
  sigma,
  optionType: "call",
});
const putPrice = blackScholes({
  stockPrice,
  strikePrice,
  time,
  rate,
  sigma,
  optionType: "put",
});

console.log("Call Option Price: ", callPrice);
console.log("Put Option Price: ", putPrice);
