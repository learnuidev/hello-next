# Enrollment Frontend Implementation

## Overview

This implementation provides a complete frontend for managing series enrollments in the Mandarino application. Users can now enroll in series, view their enrollments, and unenroll from series.

## API Endpoints Used

- `GET /v1/enrollments` - List user's enrollments
- `GET /v1/enrollments/{enrollmentId}` - Get specific enrollment
- `POST /v1/enrollments` - Create new enrollment
- `DELETE /v1/enrollments/{seriesId}` - Delete enrollment

## Files Created

### Domain Layer (`domain/enrollments/`)

1. **enrollments.types.ts**

   - TypeScript interfaces for enrollment data structures
   - Includes: Enrollment, Series, CreateEnrollmentRequest, etc.

2. **use-list-enrollments-query.ts**

   - React Query hook for fetching user's enrollments
   - Supports pagination with `limit` and `exclusiveStartKey` parameters

3. **use-get-enrollment-query.ts**

   - React Query hook for fetching a single enrollment by ID

4. **use-create-enrollment-mutation.ts**

   - React Query mutation for creating enrollments
   - Handles error cases (e.g., already enrolled)
   - Invalidates relevant queries on success

5. **use-delete-enrollment-mutation.ts**

   - React Query mutation for deleting enrollments
   - Invalidates relevant queries on success

6. **use-is-enrolled.ts**
   - Custom hook to check if user is enrolled in a specific series
   - Returns: `{ isEnrolled, enrollment, isLoading }`

### Pages

1. **app/(auth)/enrollments/page.tsx**
   - Displays all user's enrollments in a grid layout
   - Shows series thumbnail, title, description, and enrollment date
   - Empty state when no enrollments exist
   - Loading and error states

### Updated Pages

1. **app/(auth)/series/[seriesId]/page.tsx**
   - Added enrollment status indicator
   - "Enroll" button for non-enrolled series
   - "Enrolled" button for enrolled series (shows checkmark)
   - Toast notifications for success/error states
   - Loading states during enrollment operations

## Usage

### View All Enrollments

Navigate to `/enrollments` to see all enrolled series.

### Enroll in a Series

1. Navigate to a series details page (`/series/{seriesId}`)
2. Click the "Enroll" button
3. Success toast will appear

### Unenroll from a Series

1. Navigate to a series details page
2. Click the "Enrolled" button (checkmark icon)
3. Success toast will appear

## Authentication

All enrollment operations require authentication via Cognito JWT tokens, which are automatically included in API requests through the `useCurrentAuthUser` hook.

## State Management

- Uses TanStack Query (React Query) for data fetching and caching
- Automatic query invalidation on mutations ensures UI consistency
- Loading states handled throughout for better UX

## Error Handling

- Network errors display destructive toast notifications
- Specific error messages (e.g., "Already enrolled in this series") are handled
- 409 status code for duplicate enrollments

## Future Enhancements

- Add enrollment statistics (progress, completion percentage)
- Implement enrollment filters and search
- Add enrollment history
- Batch operations (enroll/unenroll multiple series)
- Enrollment recommendations
