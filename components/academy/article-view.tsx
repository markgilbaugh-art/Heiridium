import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BookCover } from '@/components/books/book-card'
import { JsonLd } from '@/components/site/json-ld'
import { Breadcrumbs, Container, CtaBand, Disclaimer } from '@/components/site/sections'
import { getBook } from '@/lib/content/books'
import { getTopic } from '@/lib/content/topics'
import type { Article } from '@/lib/content/types'
import { SITE_URL } from '@/lib/site'
import { ArticleBody } from './article-body'
import { ArticleCard, formatDate } from './article-card'

export function ArticleView({ article, related, banner }: { article: Article; related: Article[]; banner?: React.ReactNode }) {
  const topic = getTopic(article.topic)
  const books = article.relatedBooks.map((s) => getBook(s)).filter((b) => b !== undefined)
  const url = `${SITE_URL}/academy/${article.slug}`

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishAt,
    dateModified: article.revisedAt ?? article.publishAt,
    author: { '@type': 'Organization', name: article.author.name },
    publisher: { '@type': 'Organization', name: 'Heiridium' },
    mainEntityOfPage: url,
  }

  return (
    <>
      <JsonLd data={ld} />
      {banner}
      <article>
        <header className="bg-graphite text-ivory">
          <Container className="max-w-4xl py-14 md:py-20">
            <Breadcrumbs
              items={[
                { label: 'Academy', href: '/academy' },
                ...(topic ? [{ label: topic.name, href: `/academy/topics/${topic.slug}` }] : []),
                { label: article.title, href: `/academy/${article.slug}` },
              ]}
            />
            <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.1] md:text-6xl">{article.title}</h1>
            <p className="mt-6 text-pretty text-xl leading-relaxed text-ivory/75">{article.summary}</p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ivory/60">
              <div className="flex gap-2">
                <dt>By</dt>
                <dd className="text-ivory/85">{article.author.name}</dd>
              </div>
              {article.reviewer && (
                <div className="flex gap-2">
                  <dt>Reviewed by</dt>
                  <dd className="text-ivory/85">{`${article.reviewer.name}, ${article.reviewer.role}`}</dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt>Published</dt>
                <dd className="text-ivory/85">
                  <time dateTime={article.publishAt}>{formatDate(article.publishAt)}</time>
                </dd>
              </div>
              {article.revisedAt && (
                <div className="flex gap-2">
                  <dt>Updated</dt>
                  <dd className="text-ivory/85">
                    <time dateTime={article.revisedAt}>{formatDate(article.revisedAt)}</time>
                  </dd>
                </div>
              )}
            </dl>
          </Container>
        </header>

        <Container className="grid max-w-6xl gap-14 py-16 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl">
            <div className="mb-10 border-l-4 border-gold bg-card p-6">
              <p className="eyebrow text-gold">The short answer</p>
              <p className="mt-2 text-lg leading-relaxed text-ink">{article.directAnswer}</p>
            </div>
            <ArticleBody blocks={article.body} />
            {article.sources && article.sources.length > 0 && (
              <div className="mt-12 border-t border-border pt-6">
                <h2 className="text-xl font-semibold text-ink">Sources</h2>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {article.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} className="text-ink underline underline-offset-4 hover:text-gold" rel="noopener noreferrer" target="_blank">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(article.requiresProfessionalReview || article.topic === 'tax-asset-protection') && <Disclaimer className="mt-12" />}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            {books.map((book) => (
              <div key={book.slug} className="bg-graphite p-6 text-ivory">
                <div className="mx-auto w-28">
                  <BookCover book={book} />
                </div>
                <p className="eyebrow mt-5 text-gold-soft">{`Go deeper · Book ${book.numeral}`}</p>
                <p className="mt-1 font-serif text-xl font-semibold">{book.title}</p>
                <Link href={`/books/${book.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm text-gold-soft">
                  About the book
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
            <div className="border border-border bg-card p-6">
              <p className="font-serif text-xl font-semibold text-ink">Talk it through</p>
              <p className="mt-2 text-sm text-muted-foreground">A confidential conversation about your company and your options.</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-gold">
                Schedule a Private Conversation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/60 py-16">
          <Container>
            <h2 className="text-3xl font-semibold text-ink">Related guides</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <CtaBand />
    </>
  )
}
