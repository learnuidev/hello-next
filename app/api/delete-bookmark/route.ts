import { GRID_BANK_DATA } from "@/app/(auth)/interview/modules/media/media.mock";

export async function POST(req: Request) {
  const { video_id } = await req.json();

  const dataIndex = GRID_BANK_DATA.findIndex((item) => item.video_id === video_id);
  
  if (dataIndex === -1) {
    return Response.json({ error: 'Video not found' }, { status: 404 });
  }

  GRID_BANK_DATA[dataIndex].bookmarked = false;

  return Response.json({ success: true, bookmarked: false });
}