import { useGetContentQuery } from "@/domain/content/content.queries";
import ReactPlayer from "react-player";
import { JSX, useEffect, useState } from "react";
import { Heart, MessageCircle, Repeat2, Bookmark, Eye } from "lucide-react";

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// Reusable components extracted from TweetPage

type TranscriptionWord = {
  start: number;
  end: number;
  startIndex: number;
  endIndex: number;
  input: string;
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
    <div className="mb-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-4">
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
  highlights: { start: number; end: number }[]
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
      </span>
    );
    last = end;
  });
  if (last < text.length)
    parts.push(<span key="text-end">{text.slice(last)}</span>);
  return <>{parts}</>;
};

// Transcription cards component
const TranscriptionCards = ({
  transcription,
  activeRange,
}: {
  transcription?: Transcription;
  activeRange?: { start: number; end: number } | null;
}) => (
  <div className="grid gap-4 md:grid-cols-2 mb-6">
    <div className="rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-4">
      <div className="text-lg">
        {renderTextWithHighlights(
          transcription?.en || "",
          activeRange ? [activeRange] : []
        )}
      </div>
    </div>
    <div className="rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-4">
      <div className="text-lg">
        {renderTextWithHighlights(
          transcription?.pinyin || "",
          activeRange ? [activeRange] : []
        )}
      </div>
    </div>
  </div>
);

// Hanzi highlights component
const HanziHighlights = ({
  words,
  activeIndex,
}: {
  words: TranscriptionWord[];
  activeIndex: number | null;
}) => (
  <div className="mb-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-4">
    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
      Hanzi
    </div>
    <div className="text-3xl md:text-4xl tracking-wider leading-relaxed">
      {words.map((w, idx) => (
        <span
          key={idx}
          className={
            activeIndex === idx
              ? "bg-yellow-300 dark:bg-yellow-500 text-black rounded px-1"
              : ""
          }
        >
          {w.input}
        </span>
      ))}
    </div>
  </div>
);

// Author card component
const AuthorCard = ({ author }: { author?: TweetAuthor }) => {
  if (!author) return null;
  return (
    <div className="mb-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-4 flex items-center gap-4">
      <img
        src={author.profilePicture}
        alt={author.name}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-lg">{author.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          @{author.userName}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
          {author.description}
        </div>
      </div>
    </div>
  );
};

// Stats component
const TweetStats = ({ tweet }: { tweet?: Tweet }) => {
  if (!tweet) return null;
  return (
    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-3 flex items-center gap-3">
        <Heart className="w-5 h-5 text-red-500" />
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Likes</div>
          <div className="font-semibold">
            {formatNumber(tweet.likeCount || 0)}
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-3 flex items-center gap-3">
        <MessageCircle className="w-5 h-5 text-blue-500" />
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Replies
          </div>
          <div className="font-semibold">
            {formatNumber(tweet.replyCount || 0)}
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-3 flex items-center gap-3">
        <Repeat2 className="w-5 h-5 text-green-500" />
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Retweets
          </div>
          <div className="font-semibold">
            {formatNumber(tweet.retweetCount || 0)}
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 p-3 flex items-center gap-3">
        <Eye className="w-5 h-5 text-purple-500" />
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Views</div>
          <div className="font-semibold">
            {formatNumber(tweet.viewCount || 0)}
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

// Main TweetPage component using the reusable components
export function TweetPage({ contentId }: { contentId: string }) {
  const { data } = useGetContentQuery({ contentId });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const transcription = data?.transcriptions?.[0];
  const words = transcription?.words || [];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!words.length) return;
      const idx = words.findIndex(
        (w: any) => playedSeconds >= w.start && playedSeconds < w.end
      );
      setActiveIndex(idx);
    }, 100);
    return () => clearInterval(interval);
  }, [playedSeconds, words]);

  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const activeRange =
    activeIndex !== null && words[activeIndex]
      ? {
          start: words[activeIndex].startIndex,
          end: words[activeIndex].endIndex,
        }
      : null;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 text-gray-900 dark:text-gray-100">
      <TweetHeader createdAt={data?.tweet?.createdAt} />
      <AudioPlayer audioUrl={data?.audio} onProgress={handleProgress} />
      <TranscriptionCards
        transcription={transcription}
        activeRange={activeRange}
      />
      <HanziHighlights words={words} activeIndex={activeIndex} />
      <AuthorCard author={data?.tweet?.author} />
      <TweetStats tweet={data?.tweet} />
      <TweetMediaGrid media={data?.tweet?.extendedEntities?.media} />
    </div>
  );
}
