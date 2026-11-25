import type { Metadata } from 'next'
import { ServicePage } from '@/components/site/service-page'
import { howWeHelp } from '@/lib/content/services'
import { getLiveArticles } from '@/lib/content/articles'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'How We Help Trade Business Owners',
  description: 'Operations, protection, exit readiness, succession, and wealth planning for owner-led plumbing, HVAC, and home-services companies.',
  path: howWeHelp.path,
})

export default function Page() {
  return <ServicePage data={howWeHelp} articles={getLiveArticles().slice(0, 3)} />
}
