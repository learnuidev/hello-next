import { useMutation, useQuery } from '@tanstack/react-query';
import { currentAuthUser } from '@/libs/cognito/auth';
import { queryIds } from './queryIds';

export function useCurrentAuthUser (options = {}) {
    return useQuery([queryIds.currentAuthUser], currentAuthUser, {
        ...options,
        refetchInterval: 10 * 1000 * 60, // every 10 minutes
    });
}
