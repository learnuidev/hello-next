"use client";

import { StatsList } from "@/components/new-home-page/components/content-card/stats-list";
import { PageContainer } from "@/components/page-container";
import { Icons } from "@/components/ui/icons.v2";
import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SeriesDetailsPage() {
  const params = useParams<{ seriesId: string }>();

  const seriesId = params.seriesId;

  const { data } = useGetSeriesDetailsQuery({
    seriesId,
  });

  if (!data) {
    return;
  }
  return (
    <PageContainer>
      <header>
        <nav className="mt-4">
          <Link href="/">
            <Icons.back />
          </Link>
        </nav>
        <div className="my-8 flex flex-row gap-8">
          <img
            className="aspect-square w-60 rounded"
            src={data.series.backgroundImage}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{data.series.title}</h1>{" "}
            <p>{data.series.description}</p>
            <div>
              <StatsList className="text-xl mt-4" {...data.series.stats} />
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-50">
        <div>
          <code>
            <pre>{JSON.stringify(data, null, 3)}</pre>
          </code>
        </div>
      </main>
    </PageContainer>
  );
}
