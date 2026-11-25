import type { Metadata } from 'next'
import { ServicePage } from '@/components/site/service-page'
import { hvac } from '@/lib/content/services'
import { getArticlesForIndustry } from '@/lib/content/articles'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'HVAC Business Exit & Succession Planning',
  description: 'Exit and succession planning for HVAC company owners: maintenance agreements, seasonality, technician retention, and what buyers value.',
  path: hvac.path,
})

export default function Page() {
  return <ServicePage data={hvac} articles={getArticlesForIndustry('hvac')} />
}
