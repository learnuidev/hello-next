import { useGetContentQuery } from "@/domain/content/content.queries";
import ReactPlayer from "react-player";
import { JSX, useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Eye,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// Reusable components extracted from TweetPage

export type TranscriptionWord = {
  id: string;
  start: number;
  end: number;
  startIndex: number;
  endIndex: number;
  input: string;
  hanzi: string;
};

type TweetAuthor = {
  name: string;
  userName: string;
  profilePicture: string;
  description?: string;
};

type TweetMediaItem = {
  id_str: string;
  type: string;
  media_url_https: string;
};

type Tweet = {
  createdAt?: string;
  author?: TweetAuthor;
  likeCount?: number;
  replyCount?: number;
  retweetCount?: number;
  viewCount?: number;
  extendedEntities?: {
    media?: TweetMediaItem[];
  };
  url?: string;
};

type Transcription = {
  en?: string;
  pinyin?: string;
  words?: TranscriptionWord[];
};

type ContentData = {
  tweet?: Tweet;
  audio?: string;
  transcriptions?: Transcription[];
};

// Header component
const TweetHeader = ({ createdAt }: { createdAt?: string }) => (
  <div className="mb-6">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {createdAt
        ? new Date(createdAt).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : ""}
    </p>
  </div>
);

// Audio player component
const AudioPlayer = ({
  audioUrl,
  onProgress,
}: {
  audioUrl?: string;
  onProgress: (state: { playedSeconds: number }) => void;
}) => {
  if (!audioUrl) return null;
  return (
    <div className="mb-6">
      <ReactPlayer
        url={audioUrl}
        controls
        width="100%"
        height="60px"
        onProgress={onProgress}
        config={{
          file: {
            attributes: {
              className: "rounded-xl",
            },
          },
        }}
      />
    </div>
  );
};

// Text with highlights utility
const renderTextWithHighlights = (
  text: string,
  highlights: { start: number; end: number }[],
) => {
  if (!highlights.length) return text;
  const ranges = highlights.sort((a, b) => a.start - b.start);
  const parts: JSX.Element[] = [];
  let last = 0;
  ranges.forEach(({ start, end }, i) => {
    if (start > last)
      parts.push(<span key={`text-${i}`}>{text.slice(last, start)}</span>);
    parts.push(
      <span
        key={`hl-${i}`}
        className="bg-yellow-300 dark:bg-yellow-500 text-black rounded px-0.5"
      >
        {text.slice(start, end)}
      </span>,
    );
    last = end;
  });
  if (last < text.length)
    parts.push(<span key="text-end">{text.slice(last)}</span>);
  return <>{parts}</>;
};

// Combined AuthorCard and TweetStats component
const TweetAuthorAndStats = ({ tweet }: { tweet?: Tweet }) => {
  if (!tweet) return null;

  return (
    <div className="mb-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-4 flex flex-col gap-4">
      {/* Author Section */}
      <div className="flex items-center gap-4">
        <img
          src={tweet.author?.profilePicture}
          alt={tweet.author?.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-lg">{tweet.author?.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            @{tweet.author?.userName}
          </div>
          {tweet.author?.description && (
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {tweet.author.description}
            </div>
          )}
        </div>
        {tweet.url && (
          <a
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="View original tweet"
          >
            <ExternalLink className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </a>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-800 p-3 flex items-center gap-3">
          <Heart className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Likes
            </div>
            <div className="font-semibold">
              {formatNumber(tweet.likeCount || 0)}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-800 p-3 flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Replies
            </div>
            <div className="font-semibold">
              {formatNumber(tweet.replyCount || 0)}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-800 p-3 flex items-center gap-3">
          <Repeat2 className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Retweets
            </div>
            <div className="font-semibold">
              {formatNumber(tweet.retweetCount || 0)}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-neutral-800 p-3 flex items-center gap-3">
          <Eye className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Views
            </div>
            <div className="font-semibold">
              {formatNumber(tweet.viewCount || 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Media grid component
const TweetMediaGrid = ({ media }: { media?: TweetMediaItem[] }) => {
  if (!media?.length) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {media.map((mediaItem) => {
        if (mediaItem.type === "photo") {
          return (
            <img
              key={mediaItem.id_str}
              src={mediaItem.media_url_https}
              alt="Tweet media"
              className="w-full h-auto rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 object-cover"
            />
          );
        }
        return null;
      })}
    </div>
  );
};

// TranscriptionText component
const TranscriptionText = ({
  transcriptions,
  currentId,
  className,
}: {
  transcriptions?: { id: string | number; input?: string; en?: string }[];
  currentId?: string | number;
  className?: string;
}) => {
  if (!transcriptions?.length) return null;
  return (
    <div className={cn("my-12", className)}>
      {transcriptions.map((t) => (
        <span
          key={t.id}
          className={cn(
            currentId === t.id ? "dark:text-white text-black" : "text-gray-500",
          )}
        >
          {t.input ?? t.en}{" "}
        </span>
      ))}
    </div>
  );
};

// Main TweetPage component using the reusable components
export function TweetPage({ contentId }: { contentId: string }) {
  const { data } = useGetContentQuery({ contentId });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const transcription = data?.transcriptions?.[0];
  const words = transcription?.words || [];

  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const currentTranscription = data?.transcriptions?.find(
    (t: any) => t.start <= playedSeconds && t.end >= playedSeconds,
  );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 text-gray-900 dark:text-gray-100">
      <TweetHeader createdAt={data?.tweet?.createdAt} />
      <AudioPlayer audioUrl={data?.audio} onProgress={handleProgress} />

      <TranscriptionText
        transcriptions={data?.transcriptions}
        currentId={currentTranscription?.id}
        className="text-lg lg:text-2xl"
      />

      <TranscriptionText
        transcriptions={data?.transcriptions?.map((t: any) => ({
          id: t.id,
          en: t.en,
        }))}
        currentId={currentTranscription?.id}
        className="text-lg"
      />

      <TweetAuthorAndStats tweet={data?.tweet} />
      <TweetMediaGrid media={data?.tweet?.extendedEntities?.media} />
    </div>
  );
}
