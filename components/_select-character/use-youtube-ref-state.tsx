import { create } from "zustand";

import { RefObject, createRef } from "react";

interface YoutubeState {
  youtubeRef: RefObject<HTMLButtonElement> | null;
  setYoutubeRef: (ref: RefObject<HTMLButtonElement>) => void;
}

const useYoutubeRefStore = create<YoutubeState>((set) => ({
  youtubeRef: createRef<any>(),
  setYoutubeRef: (ref) => set({ youtubeRef: ref }),
}));

export const useYoutubeRefState = () => {
  const _playerRef: any = useYoutubeRefStore((state) => state.youtubeRef);

  const seekAndPlay = (time: any, ref?: any) => {
    const playerRef = ref || _playerRef;
    playerRef?.current.seekTo(time, "seconds");

    try {
      playerRef?.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    youtubeRef: _playerRef,
    seekAndPlay,
  };
};
