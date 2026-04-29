import { GRID_BANK_DATA } from "@/app/(auth)/interview/modules/media/media.mock";
import {
  GridBankMediaContentSchema,
} from "@/app/(auth)/interview/modules/media/media.types";

export async function POST(req: Request) {
  const { video_id } = await req.json();

  const content = GRID_BANK_DATA.find((item) => item.video_id === video_id);

  if (!content) {
    return Response.json({ error: "Content not found" }, { status: 404 });
  }

  const result = GridBankMediaContentSchema.safeParse(content);

  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }

  return Response.json(result.data);
}
