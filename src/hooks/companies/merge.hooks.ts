import { useMutation, useQuery } from '@tanstack/react-query'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { mergeService } from '../../api/companies/merge.service'
import type { Company } from '../../api/types/company.types'
import type {
    MergeCompleteCompanyUpdate,
    MergeConflicts,
} from '../../api/types/merge.types'

/** Shared base for cache keys; use for invalidation across all merge queries */
export const mergeKeys = {
    all: ['merge'] as const,
    conflicts: (targetId: string, duplicateId: string) =>
        [...mergeKeys.all, 'conflicts', targetId, duplicateId] as const,
}

export function useMergeConflicts(
    targetId: string,
    duplicateId: string,
    options?: Omit<UseQueryOptions<MergeConflicts>, 'queryKey' | 'queryFn'>
) {
    return useQuery({
        queryKey: mergeKeys.conflicts(targetId, duplicateId),
        queryFn: () => mergeService.getMergeConflicts(targetId, duplicateId),
        enabled: !!targetId && !!duplicateId,
        ...options,
    })
}

export interface CompleteMergeVariables {
    targetId: string
    duplicateId: string
    targetCompany: MergeCompleteCompanyUpdate
}

export function useCompleteMerge(
    options?: Omit<
        UseMutationOptions<Company, Error, CompleteMergeVariables>,
        'mutationKey' | 'mutationFn'
    >
) {
    return useMutation({
        mutationFn: ({
            targetId,
            duplicateId,
            targetCompany,
        }: CompleteMergeVariables) =>
            mergeService.completeMerge(targetId, duplicateId, targetCompany),
        ...options,
    })
}
