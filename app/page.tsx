import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/academy/article-card'
import { BookPath } from '@/components/home/book-path'
import { Hero } from '@/components/home/hero'
import { Industries } from '@/components/home/industries'
import { Outcomes } from '@/components/home/outcomes'
import { Process } from '@/components/home/process'
import { StartHere } from '@/components/home/start-here'
import { Container, CtaBand, SectionHeading } from '@/components/site/sections'
import { getLiveArticles } from '@/lib/content/articles'
import { books } from '@/lib/content/books'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: 'Exit, Succession & Profit Planning for Business Owners | Heiridium',
  description:
    'Heiridium helps owners of established businesses improve profitability, prepare for a sale or family succession, and build generational wealth.',
  path: '/',
})

const [b1, b2, b3, b4] = books
const toPath = (b: (typeof books)[number]) => ({
  numeral: b.numeral,
  title: b.title,
  slug: b.slug,
  cover: b.cover,
})

const startPaths = [
  {
    id: 'profit',
    situation: 'We are busy, but profit and cash flow do not show it',
    book: toPath(b1),
    service: { label: 'How we improve operations', href: '/how-we-help#operations' },
    guide: { label: 'Why profit and cash flow tell different stories', href: '/academy/why-profit-and-cash-flow-tell-different-stories' },
    why: 'Strong, verifiable profit is the foundation for every later option. Start with pricing, job costing, and a reliable monthly close.',
  },
  {
    id: 'protect',
    situation: 'I have not reviewed my structure, risk, or estate plan in years',
    book: toPath(b2),
    service: { label: 'Tax planning before a sale', href: '/tax-planning-before-a-sale' },
    guide: { label: 'Who owns your name, domain, and phone number?', href: '/academy/who-owns-your-company-name-domain-and-phone-number' },
    why: 'Decisions about entity, asset ownership, and estate documents are easiest to make years before a transaction.',
  },
  {
    id: 'sell',
    situation: 'I may sell in the next one to five years',
    book: toPath(b3),
    service: { label: 'Exit planning', href: '/exit-planning' },
    guide: { label: 'Can your company run without you?', href: '/academy/how-to-find-out-if-your-company-can-run-without-you' },
    why: 'Buyers pay for earnings they can verify and a company that runs without its founder. Readiness takes time to build.',
  },
  {
    id: 'family',
    situation: 'I want to pass the company or its wealth to my family',
    book: toPath(b4),
    service: { label: 'Family succession planning', href: '/succession-planning' },
    guide: { label: 'Sell the company or pass it to family?', href: '/academy/sell-the-company-or-pass-it-to-family' },
    why: 'Separate ownership from leadership, prepare heirs, and decide how your wealth will serve your family over decades.',
  },
]

export default function HomePage() {
  const latest = getLiveArticles().slice(0, 3)
  return (
    <>
      <Hero />
      <Outcomes />
      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Start here"
            title="Find the right starting point"
            intro="Pick the situation closest to yours. We will point you to the book, the planning guide, and a first article to read."
            className="mb-12"
          />
          <StartHere paths={startPaths} />
        </Container>
      </section>
      <BookPath />
      <Industries />
      <Process />
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Heiridium Academy"
              title="Practical guides, published every weekday"
              intro="Plain-language articles on profit, protection, exit readiness, and succession for owners of established businesses."
            />
            <Link href="/academy" className="inline-flex shrink-0 items-center gap-2 font-medium text-ink hover:text-gold">
              All guides
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
