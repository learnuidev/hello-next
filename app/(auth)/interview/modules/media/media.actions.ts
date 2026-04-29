"use server";

export async function toggleBookmark(prevState: any, formData: FormData) {
  const videoId = formData.get("videoId") as string;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/get-content-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_id: videoId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch content details");
    }

    const content = await response.json();
    const newBookmarkedState = !content.bookmarked;
    const endpoint = newBookmarkedState
      ? "/api/add-bookmark"
      : "/api/delete-bookmark";

    const bookmarkResponse = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_id: videoId }),
    });

    if (!bookmarkResponse.ok) {
      throw new Error("Failed to toggle bookmark");
    }

    return { success: true, bookmarked: newBookmarkedState };
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return { success: false, bookmarked: false };
  }
}
