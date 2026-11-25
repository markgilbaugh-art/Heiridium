import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/site/service-page'
import { getArticlesForIndustry } from '@/lib/content/articles'
import { industryPages } from '@/lib/content/industry-pages'
import type { IndustryCategory } from '@/lib/content/types'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(industryPages).map((industry) => ({ industry }))
}

function getPage(slug: string) {
  return industryPages[slug as IndustryCategory]
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params
  const page = getPage(industry)
  if (!page) return {}
  return pageMetadata({ ...page.seo, path: page.path, image: page.image?.src })
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params
  const page = getPage(industry)
  if (!page) notFound()
  return <ServicePage data={page} articles={getArticlesForIndustry(industry as IndustryCategory, 6)} />
}
