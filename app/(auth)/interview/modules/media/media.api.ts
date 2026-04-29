import { GRID_BANK_DATA } from "./media.mock";
import {
  GridBankMediaContent,
  GridBankMediaContentSchema,
} from "./media.types";

export const listGridBankMediaContent = async (): Promise<
  GridBankMediaContent[]
> => {
  const result = GridBankMediaContentSchema.array().safeParse(GRID_BANK_DATA);

  if (!result.success) {
    throw new Error(`Invalid data: ${result.error.message}`);
  }

  return result.data;
};
