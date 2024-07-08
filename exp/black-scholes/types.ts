export interface IBlackScholes {
  stockPrice: number;
  strikePrice: number;
  time: number;
  rate: number;
  volatility: number;
}

export type OptionType = "put" | "call";
