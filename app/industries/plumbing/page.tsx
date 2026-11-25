import type { Metadata } from 'next'
import { ServicePage } from '@/components/site/service-page'
import { plumbing } from '@/lib/content/services'
import { getArticlesForIndustry } from '@/lib/content/articles'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'Plumbing Business Exit & Succession Planning',
  description: 'Exit and succession planning for plumbing company owners: service mix, licensing continuity, crew leadership, and what buyers value.',
  path: plumbing.path,
})

export default function Page() {
  return <ServicePage data={plumbing} articles={getArticlesForIndustry('plumbing')} />
}
