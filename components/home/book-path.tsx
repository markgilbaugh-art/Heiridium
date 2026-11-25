import { BookCard } from '@/components/books/book-card'
import { ButtonLink } from '@/components/site/button-link'
import { Container, SectionHeading } from '@/components/site/sections'
import { books } from '@/lib/content/books'

export function BookPath() {
  return (
    <section className="bg-graphite py-20 text-ivory md:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            tone="light"
            eyebrow="The Heiridium series"
            title="Four books. One path from profit to legacy."
            intro="Each book covers one stage of the journey. Read them in order, or start where your company is today."
          />
          <ButtonLink href="/books" variant="outline-light" className="shrink-0">
            Series overview
          </ButtonLink>
        </div>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} tone="light" />
          ))}
        </div>
      </Container>
    </section>
  )
}
