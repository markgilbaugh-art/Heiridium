import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/academy/article-card'
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/site/sections'
import { getArticlesForTopic, getLiveArticles } from '@/lib/content/articles'
import { accentClasses } from '@/lib/content/books'
import { topics } from '@/lib/content/topics'
import { pageMetadata } from '@/lib/site'
import { cn } from '@/lib/utils'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'Heiridium Academy: Guides for HVAC & Plumbing Owners',
  description:
    'Practical guides on profit, tax and asset protection, exit readiness, and succession for plumbing, HVAC, and home-services business owners. New articles every weekday.',
  path: '/academy',
})

export default function AcademyPage() {
  const latest = getLiveArticles()
  return (
    <>
      <PageHero
        eyebrow="Heiridium Academy"
        title="Plain-language guides for trade business owners"
        intro="New articles every weekday on running a more profitable company, protecting it, preparing for a sale, and planning for your family."
        crumbs={[{ label: 'Academy', href: '/academy' }]}
      />

      <section className="py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Topic hubs" title="Browse by stage" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {topics.map((t) => {
              const count = getArticlesForTopic(t.slug).length
              return (
                <Link
                  key={t.slug}
                  href={`/academy/topics/${t.slug}`}
                  className={cn('group flex flex-col border-t-4 bg-card p-8 transition-colors hover:bg-secondary', accentClasses[t.accent].border)}
                >
                  <h2 className="flex items-center justify-between text-3xl font-semibold text-ink">
                    {t.name}
                    <ArrowRight className="size-5 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </h2>
                  <p className="mt-3 text-muted-foreground">{t.description}</p>
                  <p className="mt-6 text-sm font-medium text-ink">{`${count} ${count === 1 ? 'guide' : 'guides'}`}</p>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-secondary/60 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Latest" title="Recently published" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
