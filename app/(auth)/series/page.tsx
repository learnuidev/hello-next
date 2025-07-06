"use client";

import { useListSeriesQuery } from "./queries/use-list-series-query";

export default function SeriesPage() {
  const { data } = useListSeriesQuery();
  return (
    <div className="mx-8 py-8">
      <h1 className="text-2xl mb-8">Series </h1>

      <div>
        <code>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
