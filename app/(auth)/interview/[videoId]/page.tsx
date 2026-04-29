import { GridBankMediaContent } from "../modules/media/media.types";
import { VideoDetailsContent } from "./VideoDetailsContent";

async function fetchContentDetails(
  videoId: string,
): Promise<GridBankMediaContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/get-content-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_id: videoId }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch content details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching content details:", error);
    return null;
  }
}

export default async function VideoDetailsPage({
  params,
}: {
  params: { videoId: string };
}) {
  const content = await fetchContentDetails(params.videoId);

  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-400">Content not found</div>
      </div>
    );
  }

  return <VideoDetailsContent content={content} />;
}
