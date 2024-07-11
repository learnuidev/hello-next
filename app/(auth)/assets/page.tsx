"use client";

import { NavBar } from "@/components/navbar";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useListUserAssets = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: ["list-user-assets", authUser?.jwt],
    queryFn: async () => {
      const resp = await fetch(`${siteConfig.apiUrl}/v1/list-user-assets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      if (!resp.ok) {
        throw new Error("Something wrong happened");
      }

      return resp.json();
    },
    retry: false,
  });
};
export default function Assets() {
  const { data: userAssets, isError } = useListUserAssets();

  const router = useRouter();
  return (
    <main className="">
      <NavBar />

      <section className="px-4 md:px-12">
        <h1 className="text-2xl my-8"> Assets</h1>

        {isError
          ? "ERR"
          : userAssets?.map((asset: any) => {
              return (
                <code
                  key={JSON.stringify(asset)}
                  onClick={() => {
                    router.push(`/assets/${asset?.id}`);
                  }}
                >
                  <pre>{JSON.stringify(asset, null, 2)}</pre>
                </code>
              );
            })}
      </section>
    </main>
  );
}
