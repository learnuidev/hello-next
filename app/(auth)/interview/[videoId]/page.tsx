"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GridBankMediaContent } from "../modules/media/media.types";
import { Icons } from "@/components/ui/icons.v2";

export default function VideoDetailsPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const [content, setContent] = useState<GridBankMediaContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
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

        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetails();
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-400">Content not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group">
              <video
                src={content.url_video_watermark}
                controls
                className="w-full aspect-[9/16]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-5 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 animate-pulse" />
                  <img
                    src={
                      content.creator.url_image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={content.creator.username}
                    className="relative w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                    {content.creator.username}
                  </h2>
                  {content.creator.bio && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {content.creator.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Location
                </h3>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Icons.compass className="w-4 h-4" />
                  <span className="font-medium">
                    {[content.Municipality, content.Region]
                      .filter(Boolean)
                      .join(", ") || "Not specified"}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-500/30">
                    {content.status}
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg shadow-purple-500/30">
                    Tier {content.content_tier}
                  </span>
                  {content.is_featured && (
                    <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-medium shadow-lg shadow-yellow-500/30">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                    content.bookmarked
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30 hover:scale-105"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                  }`}
                >
                  {content.bookmarked ? (
                    <Icons.bookmarkSolid className="text-xl" />
                  ) : (
                    <Icons.bookmark className="text-xl" />
                  )}
                  <span>{content.bookmarked ? "Bookmarked" : "Bookmark"}</span>
                </button>
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-white rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-lg">
                  Share
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Icons.clock className="w-4 h-4" />
                  <span>
                    Created{" "}
                    {new Date(
                      content.create_timestamp * 1000,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
