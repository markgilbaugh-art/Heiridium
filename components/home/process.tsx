import { Container, SectionHeading } from '@/components/site/sections'

export const processSteps = [
  {
    title: 'Assess',
    text: 'A confidential review of financials, operations, ownership, and your family’s goals. You leave with a clear picture of value drivers and gaps.',
  },
  {
    title: 'Prepare',
    text: 'A prioritized plan to raise profit, reduce founder dependence, organize records, and get the company ready for whichever path you choose.',
  },
  {
    title: 'Coordinate',
    text: 'We work alongside your CPA, attorney, wealth advisor, and M&A advisor so tax, legal, and deal decisions are made together and early.',
  },
  {
    title: 'Transition',
    text: 'Support through a sale, family transfer, or move to professional management, and the family planning that follows.',
  },
]

export function Process() {
  return (
    <section className="border-t border-border bg-secondary/60 py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="How we work" title="A steady process for a decision you make once" />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-6">
              <span className="eyebrow text-gold">{`Step ${i + 1}`}</span>
              <h3 className="mt-2 text-3xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
