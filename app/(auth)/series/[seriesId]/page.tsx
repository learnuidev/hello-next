"use client";

import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import { useParams } from "next/navigation";

export default function SeriesDetailsPage() {
  const params = useParams<{ seriesId: string }>();

  const seriesId = params.seriesId;

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
