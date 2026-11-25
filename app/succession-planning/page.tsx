import type { Metadata } from 'next'
import { ServicePage } from '@/components/site/service-page'
import { successionPlanning } from '@/lib/content/services'
import { getArticlesForTopic } from '@/lib/content/articles'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'Family Business Succession Planning',
  description: 'Pass your business, or its wealth, to the next generation. Separate ownership from leadership, prepare heirs, and plan a fair transition.',
  path: successionPlanning.path,
})

export default function Page() {
  return <ServicePage data={successionPlanning} articles={getArticlesForTopic('succession-wealth').slice(0, 3)} />
}
