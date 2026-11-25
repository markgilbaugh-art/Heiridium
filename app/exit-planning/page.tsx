import type { Metadata } from 'next'
import { ServicePage } from '@/components/site/service-page'
import { exitPlanning } from '@/lib/content/services'
import { getArticlesForTopic } from '@/lib/content/articles'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'Business Exit Planning for Home-Services Owners',
  description: 'Prepare your plumbing, HVAC, or home-services company for a sale on your terms: value drivers, founder independence, clean financials, and advisor coordination.',
  path: exitPlanning.path,
})

export default function Page() {
  return <ServicePage data={exitPlanning} articles={getArticlesForTopic('exit-readiness').slice(0, 3)} />
}
