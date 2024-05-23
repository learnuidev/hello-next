import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useStoryHistoryStore = create(
  persist(
    (set: any, get: any) => ({
      history: [],
      setHistory: (event: any) => set({ history: get().history.concat(event) }),
      clearHistory: (event: any) => set({ history: [] }),
    }),
    {
      name: "mandarino/story-history", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

type Narrator = "snoop dogg";
// type Narrator =
//   | "john oliver"
//   | "russel peters"
//   | "dave chappelle"
//   | "vijay prashad"
//   | "snoop dogg";

interface IMandarinoStory {
  narrator: Narrator;
  nomad: string;
  destination: string;
  location: string;
  theme: string;
  components: string;
}

const getStory = async (
  params: IMandarinoStory,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch("/api/story-writer", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = (await res.json()) as any;
  return resp;

  // return resp.sort((a: any, b: any) => (a.level || 0) - (b.level || 0));
};

const useWriteStoryQuery = (params: IMandarinoStory) => {
  const { narrator, nomad, theme, destination, location, components } = params;
  const { data: authUser } = useCurrentAuthUser({});
  const setHistory = useStoryHistoryStore((state) => state.setHistory);
  return useQuery({
    queryKey: ["write-story", ...Object.values(params).filter(Boolean)],
    queryFn: async () => {
      const story = await getStory(params, {
        Authorization: authUser?.jwt,
      });

      setHistory({ ...params, story });

      return story;
    },
  });
};

const StoryItem = ({ story }: { story: IMandarinoStory }) => {
  const { data: storyItem } = useWriteStoryQuery(story);

  const history = useStoryHistoryStore((state) => state.history);
  const narratorHistory = history?.filter(
    (item: any) => item.narrator === story.narrator
  );

  return (
    <div className="my-8">
      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl">{story.narrator}</h2>
        <p className="text-gray-500 text-2xl font-extralight">
          {narratorHistory?.length}
        </p>
      </div>

      {/* <div className="text-sm">
        <code>
          <pre>{JSON.stringify(storyItem, null, 2)}</pre>
        </code>
      </div> */}

      <p
        className="text-gray-300 text-sm md:text-[14px]"
        dangerouslySetInnerHTML={{ __html: storyItem?.story }}
      ></p>
    </div>
  );
};

const narrators: Narrator[] = ["snoop dogg"];

export const StoryWriter = () => {
  const stories: IMandarinoStory[] = narrators?.map((narrator) => {
    return {
      narrator: narrator,
      nomad: "Erling Haaland",
      destination: "London, England",
      location: "Hotel",
      components: "A Big Beard",
      theme: "And / As well as / Moreover, However / Yet",
    };
  });

  return (
    <div className="mx-8 md:mx-32">
      <h1 className="mt-12 my-8 text-center text-4xl text-gray-200">
        Story Writer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        {stories?.map((story) => {
          return <StoryItem key={JSON.stringify(story)} story={story} />;
        })}
      </div>
    </div>
  );
};
