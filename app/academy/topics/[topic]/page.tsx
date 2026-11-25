import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/academy/article-card'
import { BookCover } from '@/components/books/book-card'
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/site/sections'
import { getArticle, getArticlesForTopic } from '@/lib/content/articles'
import { getBook } from '@/lib/content/books'
import { getTopic, topics } from '@/lib/content/topics'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params
  const topic = getTopic(slug)
  if (!topic) return {}
  return pageMetadata({
    title: `${topic.name} Guides for Business Owners | Heiridium Academy`,
    description: topic.description,
    path: `/academy/topics/${topic.slug}`,
  })
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const topic = getTopic(slug)
  if (!topic) notFound()

  const articles = getArticlesForTopic(topic.slug)
  const cornerstone = getArticle(topic.cornerstoneSlug)
  const rest = articles.filter((a) => a.slug !== cornerstone?.slug)
  const book = getBook(topic.bookSlug)

  return (
    <>
      <PageHero
        eyebrow="Topic hub"
        title={topic.name}
        intro={topic.intro}
        crumbs={[
          { label: 'Academy', href: '/academy' },
          { label: topic.name, href: `/academy/topics/${topic.slug}` },
        ]}
      />

      <section className="py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {cornerstone && (
              <div className="mb-12">
                <p className="eyebrow text-gold">Start here</p>
                <div className="mt-4">
                  <ArticleCard article={cornerstone} />
                </div>
              </div>
            )}
            <h2 className="text-3xl font-semibold text-ink">{`All ${topic.name} guides`}</h2>
            {rest.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {rest.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            ) : (
              <p className="mt-6 text-muted-foreground">More guides on this topic are publishing soon.</p>
            )}
          </div>
          <aside className="flex flex-col gap-8">
            <div className="border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold text-ink">Questions this hub answers</h2>
              <ul className="mt-5 flex flex-col gap-3 text-muted-foreground">
                {topic.questions.map((q) => (
                  <li key={q} className="flex gap-3">
                    <span className="mt-2.5 h-0.5 w-3 shrink-0 bg-gold" aria-hidden="true" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            {book && (
              <div className="flex gap-6 bg-graphite p-8 text-ivory">
                <div className="w-24 shrink-0">
                  <BookCover book={book} />
                </div>
                <div>
                  <p className="eyebrow text-gold-soft">{`Book ${book.numeral}`}</p>
                  <p className="mt-2 font-serif text-2xl font-semibold">{book.title}</p>
                  <Link href={`/books/${book.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm text-gold-soft">
                    About the book
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </Container>
      </section>

      <section className="border-t border-border py-14">
        <Container>
          <SectionHeading eyebrow="Other hubs" title="Keep exploring" />
          <ul className="mt-8 flex flex-wrap gap-3">
            {topics
              .filter((t) => t.slug !== topic.slug)
              .map((t) => (
                <li key={t.slug}>
                  <Link href={`/academy/topics/${t.slug}`} className="inline-block border border-border px-5 py-3 text-ink hover:border-gold">
                    {t.name}
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
