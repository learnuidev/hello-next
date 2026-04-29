import { GRID_BANK_DATA } from "@/app/(auth)/interview/modules/media/media.mock";
import {
  GridBankMediaContentSchema,
} from "@/app/(auth)/interview/modules/media/media.types";

export async function POST(req: Request) {
  const result = GridBankMediaContentSchema.array().safeParse(GRID_BANK_DATA);

  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }

  return Response.json(result.data);
}

export async function GET() {
  const result = GridBankMediaContentSchema.array().safeParse(GRID_BANK_DATA);

  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }

  return Response.json(result.data);
}