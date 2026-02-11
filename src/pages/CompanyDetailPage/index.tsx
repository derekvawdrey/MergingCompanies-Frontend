import { Link, useParams } from 'react-router-dom'
import { useCompany } from '../../hooks/companies'

function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: company, isLoading, error } = useCompany(id ?? '')

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-full max-w-md rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-full max-w-sm rounded bg-gray-100 animate-pulse" />
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-medium">Could not load company</p>
        <p className="mt-1 text-sm">{error?.message ?? 'Company not found.'}</p>
        <Link
          to="/"
          className="mt-3 inline-block text-sm font-medium text-red-700 underline hover:no-underline"
        >
          Back to companies
        </Link>
      </div>
    )
  }

  const addressParts = [
    company.address_line_1,
    company.address_line_2,
    [company.city, company.state].filter(Boolean).join(', '),
    company.postal_code,
  ].filter(Boolean)

  return (
    <div>
      <Link
        to="/"
        className="mb-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <span aria-hidden className="mr-1">←</span> Companies
      </Link>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
            <p className="mt-0.5 text-sm text-gray-500">ID: {company.id}</p>
          </div>
          <Link to={`/companies/${company.id}/merge`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Merge with duplicate
          </Link>
        </div>
        <dl className="px-6 py-4 sm:grid sm:grid-cols-1 sm:gap-4">
          <div className="py-3 sm:py-2">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-gray-900">
              {addressParts.length ? (
                addressParts.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < addressParts.length - 1 && <br />}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </dd>
          </div>
          <div className="border-t border-gray-100 py-3 sm:py-2">
            <dt className="text-sm font-medium text-gray-500">Address line 1</dt>
            <dd className="mt-1 text-gray-900">{company.address_line_1 || '—'}</dd>
          </div>
          <div className="border-t border-gray-100 py-3 sm:py-2">
            <dt className="text-sm font-medium text-gray-500">Address line 2</dt>
            <dd className="mt-1 text-gray-900">{company.address_line_2 || '—'}</dd>
          </div>
          <div className="border-t border-gray-100 py-3 sm:py-2">
            <dt className="text-sm font-medium text-gray-500">City</dt>
            <dd className="mt-1 text-gray-900">{company.city || '—'}</dd>
          </div>
          <div className="border-t border-gray-100 py-3 sm:py-2">
            <dt className="text-sm font-medium text-gray-500">State</dt>
            <dd className="mt-1 text-gray-900">{company.state || '—'}</dd>
          </div>
          <div className="border-t border-gray-100 py-3 sm:py-2">
            <dt className="text-sm font-medium text-gray-500">Postal code</dt>
            <dd className="mt-1 text-gray-900">{company.postal_code || '—'}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default CompanyDetailPage
