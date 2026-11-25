import type { Metadata } from 'next'
import { ServicePage } from '@/components/site/service-page'
import { taxPlanning } from '@/lib/content/services'
import { getArticlesForTopic } from '@/lib/content/articles'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'Tax Planning Before Selling a Business',
  description: 'Plan for what you keep, not just the sale price. Frame deal structure, timing, real estate, and estate questions early with your CPA and attorney.',
  path: taxPlanning.path,
})

export default function Page() {
  return <ServicePage data={taxPlanning} articles={getArticlesForTopic('tax-asset-protection').slice(0, 3)} />
}
