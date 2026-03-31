"use client";

import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";

export default function SeriesDetailsPage(props: {
  params: { seriesId: string };
}) {
  const seriesId = props.params.seriesId;
  const { data } = useGetSeriesDetailsQuery({
    seriesId,
  });
  return (
    <div>
      <h1>Series Details</h1>{" "}
      <div>
        <code>
          <pre>{JSON.stringify(data, null, 3)}</pre>
        </code>
      </div>
    </div>
  );
}
