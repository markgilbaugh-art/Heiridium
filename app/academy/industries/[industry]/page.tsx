import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/academy/article-card'
import { Container, CtaBand, PageHero } from '@/components/site/sections'
import { getArticlesForIndustry } from '@/lib/content/articles'
import { allIndustries, getIndustry, getIndustryCategory } from '@/lib/content/industries'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return allIndustries.map((i) => ({ industry: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry: slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  return pageMetadata({
    title: `${industry.name} Business Guides | Heiridium Academy`,
    description: industry.academyIntro,
    path: `/academy/industries/${industry.slug}`,
  })
}

export default async function IndustryHubPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const articles = getArticlesForIndustry(industry.slug)
  const parent = industry.parent ? getIndustryCategory(industry.parent) : undefined

  return (
    <>
      <PageHero
        eyebrow="Academy by industry"
        title={`${industry.name} guides`}
        intro={industry.academyIntro}
        crumbs={[
          { label: 'Academy', href: '/academy' },
          ...(parent ? [{ label: parent.name, href: `/academy/industries/${parent.slug}` }] : []),
          { label: industry.name, href: `/academy/industries/${industry.slug}` },
        ]}
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground">{`${articles.length} ${articles.length === 1 ? 'guide' : 'guides'} published`}</p>
            <Link href={industry.path} className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-gold">
              {`How we work with ${industry.name.toLowerCase()} owners`}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {articles.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-muted-foreground">Guides for this industry are publishing soon.</p>
          )}
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
