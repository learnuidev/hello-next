"use client";

import { useListEnrollmentsQuery } from "@/domain/enrollments";
import { PageContainer } from "@/components/page-container";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";

export default function EnrollmentsPage() {
  const { data, isLoading, error } = useListEnrollmentsQuery({ limit: 50 });

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Icons.spinner className="animate-spin h-8 w-8" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-600">Failed to load enrollments</p>
        </div>
      </PageContainer>
    );
  }

  const enrollments = data?.enrollments || [];

  if (enrollments.length === 0) {
    return (
      <PageContainer>
        <header>
          <h1 className="text-3xl font-bold mb-4">My Enrollments</h1>
        </header>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">
            You are not enrolled in any series yet.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <header>
        <h1 className="text-3xl font-bold mb-6">My Enrollments</h1>
      </header>

      <main className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {enrollments.map((enrollment) => (
          <Link
            key={enrollment.id}
            href={`/series/${enrollment.seriesId}`}
            className="block"
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {enrollment.series?.backgroundImage && (
                <img
                  src={enrollment.series.backgroundImage}
                  alt={enrollment.series.title}
                  className="w-full aspect-video object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {enrollment.series?.title || enrollment.seriesId}
                </h3>
                {enrollment.series?.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {enrollment.series.description}
                  </p>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Enrolled:{" "}
                  {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </PageContainer>
  );
}
