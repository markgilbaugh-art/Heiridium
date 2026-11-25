import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/sections'

const outcomes = [
  {
    title: 'Know what your company is worth',
    text: 'See your business the way a buyer or lender does: adjusted earnings, recurring revenue, founder dependence, and the factors that move value up or down.',
    href: '/exit-planning',
    link: 'Exit planning',
  },
  {
    title: 'Plan for what you keep after taxes',
    text: 'The headline price is not what you take home. We help you frame structure, timing, and tax questions early so your CPA and attorney can plan with you, not after you sign.',
    href: '/tax-planning-before-a-sale',
    link: 'Tax planning before a sale',
  },
  {
    title: 'Build wealth that lasts for generations',
    text: 'Whether you sell, pass the company to family, or keep ownership under professional management, we help your family prepare for what comes next.',
    href: '/succession-planning',
    link: 'Succession planning',
  },
]

export function Outcomes() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="What owners come to us for"
          title="Three questions every owner eventually asks"
          intro="Most owners we meet have spent 25 or 30 years building a company. The next decisions will shape what that work means for their family."
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
