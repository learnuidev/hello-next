export interface Enrollment {
  id: string;
  userId: string;
  seriesId: string;
  enrolledAt: string;
  updatedAt: string;
  status: "active" | "inactive";
  series?: Series;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  backgroundImageAssetId: string;
  topicType: string;
  sourceId?: string;
  stats?: {
    episodes?: number;
    totalDuration?: number;
  };
}

export interface CreateEnrollmentRequest {
  seriesId: string;
}

export interface CreateEnrollmentResponse {
  enrollment: Enrollment;
}

export interface GetEnrollmentResponse {
  enrollment: Enrollment;
}

export interface ListEnrollmentsResponse {
  enrollments: Enrollment[];
  pagination: {
    limit: number;
    hasMore: boolean;
    nextToken: string | null;
  };
}

export interface ListEnrollmentsParams {
  limit?: number;
  exclusiveStartKey?: string;
}

export interface GetEnrollmentParams {
  seriesId: string;
}

export interface DeleteEnrollmentResponse {
  seriesId: string;
}
