import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/academy/article-card'
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/site/sections'
import { getArticlesForIndustry, getArticlesForTopic, getLiveArticles } from '@/lib/content/articles'
import { industryCategories, industrySpecialties } from '@/lib/content/industries'
import { accentClasses } from '@/lib/content/books'
import { topics } from '@/lib/content/topics'
import { pageMetadata } from '@/lib/site'
import { cn } from '@/lib/utils'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'Heiridium Academy: Guides for Established Business Owners',
  description:
    'Practical guides on profit, tax and asset protection, exit readiness, and succession for owners of retail, construction and trades, e-commerce, professional services, and technology businesses. New articles every weekday.',
  path: '/academy',
})

export default function AcademyPage() {
  const latest = getLiveArticles()
  return (
    <>
      <PageHero
        eyebrow="Heiridium Academy"
        title="Plain-language guides for business owners"
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

      <section className="border-t border-border py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Industries" title="Browse by industry" />
          <ul className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {industryCategories.map((ind) => {
              const count = getArticlesForIndustry(ind.slug).length
              const specialties = industrySpecialties.filter((s) => s.parent === ind.slug)
              return (
                <li key={ind.slug} className="flex flex-col bg-background p-8">
                  <Link href={`/academy/industries/${ind.slug}`} className="group">
                    <h3 className="flex items-center justify-between gap-4 text-2xl font-semibold text-ink">
                      {ind.name}
                      <ArrowRight className="size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </h3>
                  </Link>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{ind.academyIntro}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="font-medium text-ink">{`${count} ${count === 1 ? 'guide' : 'guides'}`}</span>
                    {specialties.map((s) => (
                      <Link key={s.slug} href={`/academy/industries/${s.slug}`} className="text-ink underline underline-offset-4 hover:text-gold">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </li>
              )
            })}
          </ul>
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
