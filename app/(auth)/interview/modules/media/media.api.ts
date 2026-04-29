import {
  GridBankMediaContent,
  GridBankMediaContentSchema,
} from "./media.types";

export const listGridBankMediaContent = async (): Promise<
  GridBankMediaContent[]
> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/list-grid-bank-assets`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch grid bank data');
  }

  const data = await response.json();
  const result = GridBankMediaContentSchema.array().safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid data: ${result.error.message}`);
  }

  return result.data;
};
