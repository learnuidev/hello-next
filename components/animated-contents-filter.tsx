"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useContentTypeStore } from "@/app/(auth)/convos/use-content-type-store";
import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";

interface ICursorPosition {
  left: number;
  width: number;
  opacity: number;
}

export function AnimatedContentsFilter() {
  const [position, setPosition] = useState<ICursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [positions, setPositions] = useState<Record<string, ICursorPosition>>(
    {}
  );

  const queryClient = useQueryClient();

  // const setContentType = useContentTypeStore((state) => state.setContentType);
  // const contentType = useContentTypeStore((state) => state.contentType);

  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const setContentType = (type: string) => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, activeContent: type };
    });
    updateUserPreferenceMutation?.mutate({
      activeContent: type,
    });
  };

  const contentType = userPreferences?.activeContent;

  return (
    <div
      className="my-4"
      //   className="grid h-screen place-content-center bg-neutral-100"
    >
      <div
        onMouseLeave={() => {
          if (contentType && positions?.[contentType]) {
            setPosition(positions?.[contentType]);
          } else {
            setPosition((prevPos) => {
              return {
                ...prevPos,
                opacity: 0,
              };
            });
          }
        }}
        className="cursor-pointer relative mx-auto flex w-fit h-12 items-center rounded-full border-2 border-gray-200 dark:border-black dark:bg-[rgb(21,23,25)] bg-gray-100 p-1"
      >
        <Tab
          setPosition={setPosition}
          setPositions={setPositions}
          id={"all"}
          onClick={() => {
            setContentType("all");
          }}
        >
          All
        </Tab>
        {/* <Tab
          id={"audio"}
          setPosition={setPosition}
          setPositions={setPositions}
          onClick={() => {
            setContentType("audio");
          }}
        >
          Audio
        </Tab> */}
        <Tab
          id={"youtube"}
          setPosition={setPosition}
          setPositions={setPositions}
          onClick={() => {
            setContentType("youtube");
          }}
        >
          YouTube
        </Tab>
        <Tab
          id={"text"}
          setPosition={setPosition}
          setPositions={setPositions}
          onClick={() => {
            setContentType("text");
          }}
        >
          Text
        </Tab>
        <Tab
          id={"story"}
          setPosition={setPosition}
          setPositions={setPositions}
          onClick={() => {
            setContentType("story");
          }}
        >
          Story
        </Tab>
        <Tab
          id={"convo"}
          setPosition={setPosition}
          setPositions={setPositions}
          onClick={() => {
            setContentType("convo");
          }}
        >
          Convo
        </Tab>

        <Cursor position={position} />
      </div>
    </div>
  );
}

export function Tab({
  id,
  children,
  onClick,
  setPosition,
  setPositions,
}: {
  id: string;
  children: React.ReactNode;
  onClick?: any;
  setPosition: React.Dispatch<React.SetStateAction<ICursorPosition>>;
  setPositions: React.Dispatch<
    React.SetStateAction<Record<string, ICursorPosition>>
  >;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentType = useContentTypeStore((state) => state.contentType);
  return (
    <div
      onClick={onClick || (() => {})}
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const data: DOMRect = ref.current.getBoundingClientRect();

        const { width } = data;

        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });

        setPositions((prev: any) => {
          return {
            ...prev,
            [id]: {
              width,
              opacity: 1,
              left: ref?.current?.offsetLeft,
            },
          };
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3"
    >
      {children}
    </div>
  );
}

function Cursor({ position }: { position: any }) {
  return (
    <motion.div
      animate={position}
      className="absolute z-0 h-10 rounded-full bg-gray-200"
    />
  );
}
