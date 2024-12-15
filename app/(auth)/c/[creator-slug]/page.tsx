"use client";

import { useGetCreatorParams } from "./hooks/use-get-creator-params";

export default function CreatorPage() {
  const { creatorSlug } = useGetCreatorParams();
  return (
    <div>
      <h1>Hello, {creatorSlug}</h1>
    </div>
  );
}
