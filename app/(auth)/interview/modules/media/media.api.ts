import { GRID_BANK_DATA } from "./media.mock";
import { GridBankMediaContent } from "./media.types";

export const listGridBankMediaContent = async (): Promise<
  GridBankMediaContent[]
> => {
  return GRID_BANK_DATA;
};
