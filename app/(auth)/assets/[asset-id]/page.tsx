"use client";

import { NavBar } from "@/components/navbar";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

const useGetUserAsset = (id: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
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
export default function Assets() {
  const id = "01J2F7D814JVWWRST573NJT39S";
  const { data: userAsset, isError } = useGetUserAsset(id);
  return (
    <main className="">
      <NavBar />

      <section className="px-4 md:px-12">
        <h1 className="text-2xl my-8"> Assets</h1>

        {isError ? (
          "ERR"
        ) : (
          <code>
            <pre>{JSON.stringify(userAsset, null, 2)}</pre>
          </code>
        )}
      </section>
    </main>
  );
}
