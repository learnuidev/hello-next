export interface Creator {
  creator_id: string;
  username: string;
  url_image: string | null;
  bio: string | null;
}
export interface GridBankMediaContent {
  video_id: string;
  url_video_watermark: string;
  url_image_watermark: string;
  create_timestamp: number;
  status: "APPROVED" | "PENDING" | "REJECTED"; // assuming common video statuses
  is_featured: boolean;
  content_tier: number;
  title: string;
  Municipality: string | null;
  Region: string | null;
  loc_description: string | null;
  creator: Creator;
  bookmarked?: boolean;
}
