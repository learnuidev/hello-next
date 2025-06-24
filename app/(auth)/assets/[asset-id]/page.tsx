"use client";

import { NavBar } from "@/components/navbar";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { isAudio } from "../../convos/new-content/utils/is-audio";
import ReactPlayer from "react-player";

const useGetUserAsset = (id: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any>({
    queryKey: ["get-user-asset", authUser?.jwt],
    queryFn: async () => {
      const resp = await fetch(`${siteConfig.apiUrl}/v1/get-user-asset`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!resp.ok) {
        throw new Error("Something wrong happened");
      }

      return resp.json();
    },
    retry: false,
  });
};

function RenderContent({
  userAsset,
}: {
  userAsset: { extension: string; sourceUrl: string };
}) {
  if (isAudio(userAsset?.sourceUrl)) {
    return (
      <ReactPlayer
        url={userAsset?.sourceUrl}
        // width={isSmall ? "100%" : "600px"}
        height={"40px"}
        controls
      />
    );
  }

  return (
    <code>
      <pre>{JSON.stringify(userAsset, null, 2)}</pre>
    </code>
  );
}
export default function Assets() {
  const params = useParams<{ "asset-id": string }>();
  const id = "01J2F7D814JVWWRST573NJT39S";
  const [location, setLocation] = useState<string | number>(0);

  const { data: userAsset, isError } = useGetUserAsset(params["asset-id"]);

  return (
    <main className="">
      <NavBar />

      <section className="px-4 md:px-12">
        <h1 className="text-2xl my-8"> Assets</h1>

        {isError ? "ERR" : <RenderContent userAsset={userAsset} />}
      </section>
    </main>
  );
}
