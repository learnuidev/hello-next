export interface IBlackScholes {
  stockPrice: number;
  strikePrice: number;
  time: number;
  rate: number;
  sigma: number;
}

export type OptionType = "put" | "call";
