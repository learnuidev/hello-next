// Black-Scholes Option Pricing Model in JavaScript

import { IBlackScholes, OptionType } from "./types";
import { getCallOptionPrice, getPutOptionPrice } from "./utils";

// Function to calculate the Black-Scholes option price
function blackScholes(
  props: IBlackScholes & {
    optionType?: OptionType;
  }
) {
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

export { blackScholes, getCallOptionPrice, getPutOptionPrice };
