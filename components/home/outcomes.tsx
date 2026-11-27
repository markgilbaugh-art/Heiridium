import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/sections'

const outcomes = [
  {
    title: 'Build a profitable business',
    text: 'Improve leadership, accountability, processes, technology, marketing, social media, accounting and operational efficiency. Build a company that earns more and depends less on you.',
    href: '/how-we-help',
    link: 'Business consulting',
  },
  {
    title: 'Prepare for a sale or retire sooner',
    text: 'Prepare for a liquidity event or explore a direct acquisition by Heiridium, including negotiated seller financing where appropriate. You may not need to spend another three years preparing to retire.',
    href: '/exit-planning',
    link: 'Explore exit options',
  },
  {
    title: 'Build wealth that lasts for generations',
    text: 'Coordinate with independent attorneys, CPAs and wealth advisors to evaluate trust structures, potential capital gains tax savings, retirement income and family succession.',
    href: '/tax-planning-before-a-sale',
    link: 'Preserve your wealth',
  },
]

export function Outcomes() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="What owners come to us for"
          title="Three ways we help you build your legacy"
          intro="Whether you want to improve profitability, sell your company or retire now, your goals come first."
        />
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {outcomes.map((o, i) => (
            <div key={o.title} className="flex flex-col bg-background p-8 md:p-10">
              <span className="font-serif text-5xl font-semibold text-gold">{`0${i + 1}`}</span>
              <h3 className="mt-6 text-3xl font-semibold leading-tight text-ink">{o.title}</h3>
              <p className="mt-4 flex-1 text-muted-foreground">{o.text}</p>
              <Link href={o.href} className="mt-6 inline-flex items-center gap-2 font-medium text-ink hover:text-gold">
                {o.link}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
