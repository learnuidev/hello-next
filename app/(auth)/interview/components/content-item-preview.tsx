import Image from "next/image";
import { Icons } from "@/components/ui/icons.v2";
import { GridBankMediaContent } from "../modules/media/media.types";
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { toggleBookmark } from "../modules/media/media.actions";
import Link from "next/link";

interface ContentItemPreviewProps {
  content: GridBankMediaContent;
}

export function ContentItemPreview({ content }: ContentItemPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, formAction] = useFormState(toggleBookmark, null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      className="my-4 relative h-128 w-full sm:h-72 sm:w-36 md:h-120 md:w-80 rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <form action={formAction} className="absolute top-4 right-4 z-50">
        <input type="hidden" name="videoId" value={content.video_id} />
        <button type="submit" className="text-2xl text-white">
          {state?.bookmarked ?? content.bookmarked ? (
            <Icons.bookmarkSolid />
          ) : (
            <Icons.bookmark />
          )}
        </button>
      </form>

      <Link href={`/interview/${content.video_id}`} key={content.video_id}>
        <video
          ref={videoRef}
          src={content?.url_video_watermark}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200`}
        />
        {isHovered ? null : (
          <Image
            src={content?.url_image_watermark}
            alt={content?.title}
            fill
            loading="lazy"
            decoding="async"
            className={`object-cover transition-opacity duration-200`}
            sizes="(max-width: 639px) 256px, (max-width: 1999px) 222px, (min-width: 1200px) 256px"
          />
        )}
      </Link>
    </div>
  );
}
