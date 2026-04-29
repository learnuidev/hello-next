import Image from "next/image";
import { Icons } from "@/components/ui/icons.v2";
import { GridBankMediaContent } from "../modules/media/media.types";

interface ContentItemPreviewProps {
  asset: GridBankMediaContent;
  onToggleBookmark: (videoId: string) => void;
}

export function ContentItemPreview({
  asset,
  onToggleBookmark,
}: ContentItemPreviewProps) {
  return (
    <div className="relative h-128 w-full sm:h-72 sm:w-36 md:h-120 md:w-80 rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => {
          onToggleBookmark(asset.video_id);
        }}
        className="absolute top-4 right-4 z-50 text-2xl text-white"
      >
        {asset.bookmarked ? <Icons.bookmarkSolid /> : <Icons.bookmark />}
      </button>
      <Image
        src={asset?.url_image_watermark}
        alt={asset?.title}
        fill
        loading="lazy"
        decoding="async"
        className="object-cover transition-transform duration-300"
        sizes="(max-width: 639px) 256px, (max-width: 1999px) 222px, (min-width: 1200px) 256px"
      />
    </div>
  );
}
