import type { Metadata } from 'next'
import Image from 'next/image'
import { BookCard } from '@/components/books/book-card'
import { BookUpdatesForm } from '@/components/forms/book-updates-form'
import { JsonLd } from '@/components/site/json-ld'
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/site/sections'
import { books } from '@/lib/content/books'
import { SITE_URL, pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'The Heiridium Book Series for Business Owners',
  description:
    'Four books for owners of established businesses: build a profitable business, protect what you built, build a sellable business, and build generational wealth.',
  path: '/books',
})

export default function BooksPage() {
  const seriesLd = {
    '@context': 'https://schema.org',
    '@type': 'BookSeries',
    name: 'Heiridium',
    url: `${SITE_URL}/books`,
    hasPart: books.map((b) => ({
      '@type': 'Book',
      name: b.title,
      position: b.number,
      url: `${SITE_URL}/books/${b.slug}`,
    })),
  }

  return (
    <>
      <JsonLd data={seriesLd} />
      <PageHero
        eyebrow="The Heiridium series"
        title="Four books. One path from profit to legacy."
        intro="A practical series for owners of established businesses. Each book covers one stage: profit, protection, sale readiness, and generational wealth."
        crumbs={[{ label: 'Books', href: '/books' }]}
      >
        <Image
          src="/images/books/series.png"
          alt="The four Heiridium book covers side by side: Build a Profitable Business, Protect What You Built, Build a Sellable Business, and Build Generational Wealth."
          width={1774}
          height={887}
          priority
          sizes="(min-width: 1280px) 1100px, 100vw"
          className="mt-12 h-auto w-full"
        />
      </PageHero>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Read in order, or start where you are"
            title="The four stages"
            intro="Most owners read the series in order. If your company is already profitable, or a sale is on the horizon, start with the book that matches your stage."
          />
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </Container>
      </section>

      <section id="updates" className="scroll-mt-24 border-t border-border bg-secondary/60 py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Release updates"
            title="Get Book Updates"
            intro="The books are in their final stages. Tell us which ones you want, and we will email you when they are released. No other mail unless you ask for it."
          />
          <BookUpdatesForm />
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
