"use client";

import { AppleKaraokeView } from "@/app/(auth)/convos/audiobook-player/components/karaoke/apple-karaoke-view";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Standalone playground for the Apple-Music-Sing-style karaoke view.
 *
 * The real view needs an authenticated content item plus a playing audio file;
 * this page drives it with synthetic per-syllable timings so the animation can
 * be reviewed (and tweaked) on its own. Nothing here is part of the player.
 */

type MockLine = {
  hanzi: string;
  pinyin: string[];
  roman: string[];
  en: string;
  chinglish: string;
};

const CHINESE_LINES: MockLine[] = [
  {
    hanzi: "很久以前",
    pinyin: ["hěn", "jiǔ", "yǐ", "qián"],
    roman: ["hen3", "jiu3", "yi3", "qian2"],
    en: "A long time ago",
    chinglish: "Very long ago",
  },
  {
    hanzi: "有一只小狐狸住在大森林里",
    pinyin: ["yǒu", "yī", "zhǐ", "xiǎo", "hú", "lí", "zhù", "zài", "dà", "sēn", "lín", "lǐ"],
    roman: [],
    en: "There lived a little fox in the great forest",
    chinglish: "Have one little fox live in big forest inside",
  },
  {
    hanzi: "它每天都想着去山顶看看",
    pinyin: ["tā", "měi", "tiān", "dōu", "xiǎng", "zhe", "qù", "shān", "dǐng", "kàn", "kàn"],
    roman: [],
    en: "Every day it dreamed of seeing the mountain top",
    chinglish: "It every day all thinking go mountain top look look",
  },
  {
    hanzi: "风吹过树梢的时候",
    pinyin: ["fēng", "chuī", "guò", "shù", "shāo", "de", "shí", "hòu"],
    roman: [],
    en: "When the wind blew through the treetops",
    chinglish: "Wind blow pass tree top time",
  },
  {
    hanzi: "它听见了远方的声音",
    pinyin: ["tā", "tīng", "jiàn", "le", "yuǎn", "fāng", "de", "shēng", "yīn"],
    roman: [],
    en: "It heard a voice from far away",
    chinglish: "It hear arrive far place sound",
  },
  {
    hanzi: "于是它决定出发",
    pinyin: ["yú", "shì", "tā", "jué", "dìng", "chū", "fā"],
    roman: [],
    en: "So it decided to set off",
    chinglish: "So it decide start out",
  },
];

const ENGLISH_LINES: MockLine[] = [
  {
    hanzi: "The quick brown fox",
    pinyin: [],
    roman: [],
    en: "",
    chinglish: "",
  },
  {
    hanzi: "jumps over the lazy dog every single morning",
    pinyin: [],
    roman: [],
    en: "",
    chinglish: "",
  },
  {
    hanzi: "and the dog never seems to mind at all",
    pinyin: [],
    roman: [],
    en: "",
    chinglish: "",
  },
];

/** Audiobook-shaped content: full sentences, word-segmented, long enough to wrap. */
const BOOK_SENTENCES: { text: string; en: string }[] = [
  { text: "很久以前有一只小狐狸住在大森林边上的山洞里", en: "Long ago a little fox lived in a cave at the edge of the forest." },
  { text: "它每天早晨都会爬到山顶上看着远处飘过的白云", en: "Every morning it climbed to the summit and watched the white clouds drift by." },
  { text: "有一天它听见了森林深处传来一种奇怪的声音", en: "One day it heard a strange sound coming from deep inside the forest." },
  { text: "那声音像是有人在轻轻地唱歌又像是在哭", en: "The sound was like someone singing softly, and also like crying." },
  { text: "小狐狸犹豫了很久最后决定去看看那是什么", en: "The little fox hesitated for a long time, then decided to go and see." },
  { text: "它穿过一片长满野草的湿地走进了黑暗的树林", en: "It crossed a marsh full of wild grass and walked into the dark woods." },
  { text: "树枝在风里摇晃影子像一只只伸出来的手", en: "The branches swayed in the wind, their shadows like reaching hands." },
  { text: "它把尾巴夹得紧紧的脚步却一点也没有停下", en: "It tucked its tail tight, yet never once stopped walking." },
  { text: "声音越来越清楚原来是一口很老的井在响", en: "The sound grew clearer: it was an old well echoing." },
  { text: "井边坐着一只灰色的兔子正在数着手里的石头", en: "Beside the well sat a grey rabbit, counting the stones in its hands." },
  { text: "兔子抬起头说你也是来听井里的故事的吗", en: "The rabbit looked up and asked: did you also come to hear the well's stories?" },
  { text: "小狐狸点点头于是它们一起坐在了井边", en: "The little fox nodded, and so they sat down together beside the well." },
  { text: "老井缓缓地开始讲述一个关于远方的故事说在山的另一边有一片会发光的湖水每年冬天都会有人从很远的地方走来只为了看上一眼", en: "The old well slowly began to tell a story about a faraway place: beyond the mountain there is a lake that glows, and every winter people walk a very long way just to see it once." },
];

const buildBookTranscriptions = () => {
  let cursor = 3;

  return BOOK_SENTENCES.map((sentence, lineIndex) => {
    const chars = sentence.text.split("");
    const units: string[] = [];

    // Rough word segmentation: mostly two-character words.
    for (let index = 0; index < chars.length; index += 2) {
      units.push(chars.slice(index, index + 2).join(""));
    }

    const perUnit = 0.42;
    const start = cursor;

    const words = units.map((unit, index) => {
      const wordStart = start + index * perUnit;

      return {
        id: `bw-${lineIndex}-${index}`,
        input: unit,
        hanzi: unit,
        pinyin: "",
        roman: "",
        start: wordStart,
        end: wordStart + perUnit,
        startIndex: index * 2,
        endIndex: index * 2 + unit.length,
      };
    });

    const end = start + units.length * perUnit;
    cursor = end + 4;

    return {
      id: `book-${lineIndex}`,
      input: sentence.text,
      hanzi: sentence.text,
      pinyin: "",
      roman: "",
      en: sentence.en,
      chinglish: sentence.en,
      lang: "zh",
      start,
      end,
      words,
    };
  });
};

const buildMockTranscriptions = (lines: MockLine[], lang: string) => {
  let cursor = 4; // leaves room for the count-in animation

  return lines.map((line, lineIndex) => {
    const start = cursor;
    const perUnit = lang === "zh" ? 0.34 : 0.26;

    const units =
      lang === "zh"
        ? line.hanzi.split("")
        : line.hanzi.split(" ").flatMap((word, index, all) =>
            index === all.length - 1 ? [word] : [word, " "],
          );

    const words = units.map((unit, index) => {
      const wordStart = start + index * perUnit;

      return {
        id: `w-${lineIndex}-${index}`,
        input: unit,
        hanzi: unit,
        pinyin: line.pinyin[index] || "",
        roman: line.roman[index] || "",
        start: wordStart,
        end: wordStart + perUnit,
        startIndex: index,
        endIndex: index + 1,
      };
    });

    const end = start + units.length * perUnit;
    cursor = end + 0.9;

    return {
      id: `line-${lineIndex}`,
      input: line.hanzi,
      hanzi: line.hanzi,
      pinyin: line.pinyin.join(" "),
      roman: line.roman.join(" "),
      en: line.en,
      chinglish: line.chinglish,
      lang,
      start,
      end,
      words,
    };
  });
};

const useFakePlayer = (startAt: number, startPaused = false) => {
  const [isPlaying, setIsPlaying] = useState(!startPaused);
  const [currentTime, setCurrentTime] = useState(startAt);
  const playingRef = useRef(!startPaused);
  const timeRef = useRef(startAt);
  const lastRef = useRef(0);

  const playerRef = useMemo(
    () => ({
      current: {
        getCurrentTime: () => timeRef.current,
        seekTo: (time: number) => {
          timeRef.current = time;
          setCurrentTime(time);
        },
      },
    }),
    [],
  );

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  // Drive the clock the way a real <audio> element would.
  useEffect(() => {
    let frame = 0;
    lastRef.current = performance.now();

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;

      if (playingRef.current) {
        timeRef.current += dt;
      }
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, []);

  // ...and only report it 10x/second, like react-player's onProgress.
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(Math.round(timeRef.current * 10) / 10);
    }, 100);

    return () => clearInterval(id);
  }, []);

  return {
    playerRef,
    currentTime,
    isPlaying,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    seekAndPlay: (time: number) => {
      timeRef.current = time;
      setCurrentTime(time);
      setIsPlaying(true);
    },
    seek: (time: number) => {
      timeRef.current = time;
      setCurrentTime(time);
    },
  };
};

export default function KaraokePlayground() {
  const searchParams = useSearchParams();
  const { setTheme, resolvedTheme } = useTheme();

  const lang = searchParams.get("lang") || "zh";
  const startAt = parseFloat(searchParams.get("t") || "0") || 0;
  const theme = searchParams.get("theme");
  const paused = searchParams.get("paused") === "1";
  const compact = searchParams.get("compact") === "1";
  // No player ref + a single transcription: the degraded path other callers use.
  const noPlayer = searchParams.get("noplayer") === "1";

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  const transcriptions = useMemo(() => {
    if (lang === "book") {
      return buildBookTranscriptions();
    }

    return buildMockTranscriptions(
      lang === "en" ? ENGLISH_LINES : CHINESE_LINES,
      lang,
    );
  }, [lang]);

  const player = useFakePlayer(startAt, paused);

  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const setShowPinyin = useBrightModeStore((state) => state.setShowPinyin);
  const showEn = useBrightModeStore((state) => state.showEn);
  const setShowEn = useBrightModeStore((state) => state.setShowEn);
  const { showChinglish, setShowChinglish } = useChinglishState();

  // Let a URL decide the display toggles too, so screenshots are reproducible.
  useEffect(() => {
    const pinyin = searchParams.get("pinyin");
    const en = searchParams.get("en");
    const chinglish = searchParams.get("chinglish");

    if (pinyin) setShowPinyin(pinyin === "1");
    if (en) setShowEn(en === "1");
    if (chinglish) setShowChinglish(chinglish === "1");
  }, [searchParams, setShowPinyin, setShowEn, setShowChinglish]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <button
          className="rounded-full border px-3 py-1"
          onClick={() => player.play()}
        >
          play
        </button>
        <button
          className="rounded-full border px-3 py-1"
          onClick={() => player.pause()}
        >
          pause
        </button>
        {[0, 6, 12, 16, 20, 24, 28].map((time) => (
          <button
            key={time}
            className="rounded-full border px-3 py-1"
            onClick={() => player.seekAndPlay(time)}
          >
            {time}s
          </button>
        ))}
        <a className="rounded-full border px-3 py-1" href="?lang=zh&theme=dark">
          zh / dark
        </a>
        <a className="rounded-full border px-3 py-1" href="?lang=en&theme=dark">
          en / dark
        </a>
        <a
          className="rounded-full border px-3 py-1"
          href="?lang=book&theme=dark&paused=1&en=1&t=120"
        >
          book / deep
        </a>
        <a
          className="rounded-full border px-3 py-1"
          href="?lang=book&theme=dark&paused=1&en=1&t=120&compact=1"
        >
          book / compact
        </a>
        <a className="rounded-full border px-3 py-1" href="?lang=zh&theme=light">
          zh / light
        </a>
        <button
          className="rounded-full border px-3 py-1"
          onClick={() => setShowPinyin(!showPinyin)}
        >
          pinyin: {showPinyin ? "on" : "off"}
        </button>
        <button
          className="rounded-full border px-3 py-1"
          onClick={() => setShowEn(!showEn)}
        >
          en: {showEn ? "on" : "off"}
        </button>
        <button
          className="rounded-full border px-3 py-1"
          onClick={() => setShowChinglish(!showChinglish)}
        >
          chinglish: {showChinglish ? "on" : "off"}
        </button>
        <span className="ml-auto tabular-nums opacity-60">
          t = {player.currentTime.toFixed(1)}s · theme={theme ?? "auto"}/
          {resolvedTheme ?? "-"} · {player.isPlaying ? "playing" : "paused"}
        </span>
      </div>

      <AppleKaraokeView
        transcriptions={noPlayer ? undefined : transcriptions}
        fallbackTranscription={noPlayer ? transcriptions[0] : undefined}
        lang={lang}
        currentTime={player.currentTime}
        isPlaying={player.isPlaying}
        playerRef={noPlayer ? undefined : player.playerRef}
        seekAndPlay={player.seekAndPlay}
        onPlay={player.play}
        onPause={player.pause}
        compact={compact}
        coverUrl="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=60"
      />
    </div>
  );
}
