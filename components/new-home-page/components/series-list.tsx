"use client";

import { useListSeriesQuery } from "@/domain/content-v2/use-list-series-query";
import { cn } from "@/lib/utils";

export function SeriesList() {
  const { data, isLoading } = useListSeriesQuery({ limit: 10 });

  if (isLoading) {
    return (
      <section className="mt-8">
        <div className="text-center text-gray-500">Loading...</div>
      </section>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <section className="mt-8">
        <div className="text-center text-gray-500">No series found</div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Series</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.items.map((series) => (
          <div
            key={series.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="aspect-square bg-cover bg-center"
              style={{ backgroundImage: `url(${series.backgroundImage})` }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{series.title}</h3>
              <p className="text-sm text-gray-500 truncate">
                {series.source.title}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>★ {series.stats.averageRating}</span>
                <span>{series.stats.totalPlays} plays</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
