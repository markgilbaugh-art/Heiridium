import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { ArticleCard } from '@/components/academy/article-card'
import { BookCover } from '@/components/books/book-card'
import { BookUpdatesForm } from '@/components/forms/book-updates-form'
import { ButtonLink } from '@/components/site/button-link'
import { JsonLd } from '@/components/site/json-ld'
import { Breadcrumbs, Container, CtaBand, SectionHeading } from '@/components/site/sections'
import { getArticlesForBook } from '@/lib/content/articles'
import { accentClasses, books, getBook, getNextBook } from '@/lib/content/books'
import { getTopic } from '@/lib/content/topics'
import { SITE_URL, pageMetadata } from '@/lib/site'
import { cn } from '@/lib/utils'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) return {}
  return pageMetadata({
    title: book.seoTitle,
    description: book.seoDescription,
    path: `/books/${book.slug}`,
    image: book.cover,
  })
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) notFound()

  const accent = accentClasses[book.accent]
  const next = getNextBook(book)
  const topic = getTopic(book.topic)
  const articles = getArticlesForBook(book.slug)

  const bookLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    url: `${SITE_URL}/books/${book.slug}`,
    image: `${SITE_URL}${book.cover}`,
    description: book.seoDescription,
    bookFormat: 'https://schema.org/Hardcover',
    isPartOf: { '@type': 'BookSeries', name: 'Heiridium', url: `${SITE_URL}/books` },
    position: book.number,
    publisher: { '@type': 'Organization', name: 'Heiridium' },
    ...(book.isbn ? { isbn: book.isbn } : {}),
  }

  return (
    <>
      <JsonLd data={bookLd} />
      <section className="relative overflow-hidden bg-graphite text-ivory">
        <div className={cn('absolute inset-x-0 top-0 h-1.5', accent.bg)} aria-hidden="true" />
        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div className="mx-auto w-full max-w-xs lg:max-w-sm">
            <BookCover book={book} priority />
          </div>
          <div>
            <Breadcrumbs
              items={[
                { label: 'Books', href: '/books' },
                { label: book.title, href: `/books/${book.slug}` },
              ]}
            />
            <p className="eyebrow mt-8 text-gold-soft">{`Heiridium · Book ${book.numeral}`}</p>
            <h1 className="mt-3 text-balance text-5xl font-semibold leading-[1.05] md:text-6xl">{book.title}</h1>
            <p className="mt-6 max-w-xl text-pretty text-xl leading-relaxed text-ivory/80">{book.tagline}</p>
            <p className="mt-4 max-w-xl text-ivory/65">{book.readerProfile}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {book.availability === 'available' && book.buyUrl ? (
                <ButtonLink href={book.buyUrl}>Buy the book</ButtonLink>
              ) : (
                <ButtonLink href="#updates">Get Book Updates</ButtonLink>
              )}
              <ButtonLink href="/contact" variant="outline-light">
                Schedule a Private Conversation
              </ButtonLink>
            </div>
            {book.availability !== 'available' && (
              <p className="mt-4 text-sm text-ivory/55">Coming soon. Join the list to hear when it is released.</p>
            )}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-4xl font-semibold text-ink">About the book</h2>
            <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
              {book.synopsis.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside className={cn('border-t-4 bg-card p-8', accent.border)}>
            <h2 className="text-2xl font-semibold text-ink">Start with this book if</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {book.startHereIf.map((s) => (
                <li key={s} className="flex gap-3 text-ink">
                  <Check className={cn('mt-1 size-4 shrink-0', accent.text)} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="border-y border-border bg-secondary/60 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Inside" title="What the book covers" />
          <ol className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {book.chapters.map((c, i) => (
              <li key={c.title} className="bg-background p-8">
                <span className={cn('eyebrow', accent.text)}>{`Part ${i + 1}`}</span>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.summary}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <h3 className="text-3xl font-semibold text-ink">Key takeaways</h3>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {book.takeaways.map((t) => (
                <li key={t} className="flex gap-3 text-ink">
                  <span className={cn('mt-2.5 h-0.5 w-4 shrink-0', accent.bg)} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {articles.length > 0 && (
        <section className="py-20 md:py-24">
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow="Heiridium Academy" title="Related guides" />
              {topic && (
                <Link
                  href={`/academy/topics/${topic.slug}`}
                  className="inline-flex shrink-0 items-center gap-2 font-medium text-ink hover:text-gold"
                >
                  {`All ${topic.name} guides`}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section id="updates" className="scroll-mt-24 bg-graphite py-20 text-ivory md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Release updates"
              title={`Be the first to read Book ${book.numeral}`}
              intro="We will email you when it is released. You can also choose other books in the series."
            />
            <Link
              href={book.relatedServicePath.href}
              className="mt-8 inline-flex items-center gap-2 text-gold-soft hover:underline"
            >
              {book.relatedServicePath.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <BookUpdatesForm defaultBook={book.slug} tone="light" />
        </Container>
      </section>

      {next && (
        <section className="border-b border-border py-14">
          <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-gold">{`Next in the series · Book ${next.numeral}`}</p>
              <p className="mt-2 font-serif text-3xl font-semibold text-ink">{next.title}</p>
            </div>
            <ButtonLink href={`/books/${next.slug}`} variant="outline-dark">
              Continue the series
            </ButtonLink>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  )
}
