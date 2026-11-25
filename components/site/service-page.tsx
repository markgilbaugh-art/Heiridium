import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { ArticleCard } from '@/components/academy/article-card'
import { BookCover } from '@/components/books/book-card'
import { ButtonLink } from './button-link'
import { Container, CtaBand, Disclaimer, FaqList, PageHero, SectionHeading, type Crumb } from './sections'
import { JsonLd } from './json-ld'
import { getBook } from '@/lib/content/books'
import type { Article } from '@/lib/content/types'
import { SITE_URL } from '@/lib/site'

export type ServicePageData = {
  path: string
  crumbs: Crumb[]
  eyebrow: string
  title: string
  intro: string
  image?: { src: string; alt: string }
  problem: { title: string; paragraphs: string[] }
  pillars: { title: string; text: string }[]
  checklist?: { title: string; items: string[] }
  bookSlugs: string[]
  faqs: { q: string; a: string }[]
  showDisclaimer?: boolean
  serviceName: string
}

export function ServicePage({ data, articles }: { data: ServicePageData; articles: Article[] }) {
  const relatedBooks = data.bookSlugs.map((s) => getBook(s)).filter((b) => b !== undefined)
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.serviceName,
    description: data.intro,
    url: `${SITE_URL}${data.path}`,
    provider: { '@type': 'Organization', name: 'Heiridium', url: 'https://heiridium.com' },
    areaServed: 'US',
  }

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero eyebrow={data.eyebrow} title={data.title} intro={data.intro} crumbs={data.crumbs}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact">Schedule a Private Conversation</ButtonLink>
          <ButtonLink href="/books" variant="outline-light">
            Explore the Books
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h2 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">{data.problem.title}</h2>
            <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
              {data.problem.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {data.image ? (
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          ) : (
            data.checklist && <Checklist {...data.checklist} />
          )}
        </Container>
      </section>

      <section className="border-y border-border bg-secondary/60 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="How we help" title="Where we focus" />
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {data.pillars.map((p) => (
              <div key={p.title} className="bg-background p-8">
                <h3 className="text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {data.image && data.checklist && (
        <section className="py-20 md:py-24">
          <Container className="max-w-4xl">
            <Checklist {...data.checklist} />
          </Container>
        </section>
      )}

      {relatedBooks.length > 0 && (
        <section className="bg-graphite py-20 text-ivory md:py-24">
          <Container>
            <SectionHeading tone="light" eyebrow="Related reading" title="From the Heiridium series" />
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {relatedBooks.map((book) => (
                <div key={book.slug} className="flex gap-6">
                  <Link href={`/books/${book.slug}`} className="w-28 shrink-0 sm:w-36">
                    <BookCover book={book} />
                  </Link>
                  <div>
                    <p className="eyebrow text-gold-soft">{`Book ${book.numeral}`}</p>
                    <h3 className="mt-2 text-3xl font-semibold">{book.title}</h3>
                    <p className="mt-2 text-ivory/70">{book.tagline}</p>
                    <Link
                      href={`/books/${book.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-soft"
                    >
                      {`About Book ${book.numeral}`}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {articles.length > 0 && (
        <section className="py-20 md:py-24">
          <Container>
            <SectionHeading eyebrow="Heiridium Academy" title="Guides on this topic" />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border py-20 md:py-24">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked" className="mb-10" />
          <FaqList items={data.faqs} />
          {data.showDisclaimer && <Disclaimer className="mt-10" />}
        </Container>
      </section>

      <CtaBand />
    </>
  )
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-border bg-card p-8">
      <h2 className="text-3xl font-semibold text-ink">{title}</h2>
      <ul className="mt-6 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base text-ink">
            <Check className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
