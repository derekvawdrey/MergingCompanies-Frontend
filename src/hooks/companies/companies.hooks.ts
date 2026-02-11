import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { companiesService } from '../../api/companies/companies.service'
import type { Company } from '../../api/types/company.types'

/** Shared base for cache keys; use for invalidation across all company queries */
export const companyKeys = {
    all: ['company'] as const,
    list: () => [...companyKeys.all, 'list'] as const,
    detail: (id: string) => [...companyKeys.all, 'detail', id] as const,
}

export function useCompanies(
    options?: Omit<UseQueryOptions<Company[]>, 'queryKey' | 'queryFn'>
) {
    return useQuery({
        queryKey: companyKeys.list(),
        queryFn: () => companiesService.getCompanies(),
        ...options,
    })
}

export function useCompany(
    id: string,
    options?: Omit<UseQueryOptions<Company>, 'queryKey' | 'queryFn'>
) {
    return useQuery({
        queryKey: companyKeys.detail(id),
        queryFn: () => companiesService.getCompanyById(id),
        enabled: !!id,
        ...options,
    })
}
