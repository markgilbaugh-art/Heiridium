import type { Metadata } from 'next'
import Image from 'next/image'
import { Process } from '@/components/home/process'
import { Container, CtaBand, PageHero, SectionHeading } from '@/components/site/sections'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About Heiridium | Advisors to Trade Business Owners',
  description:
    'Heiridium helps owners of plumbing, HVAC, and home-services companies turn decades of work into a stronger company, a successful transition, and generational wealth.',
  path: '/about',
})

const values = [
  { title: 'Plain language', text: 'No jargon and no pressure. You should understand every recommendation and the reason for it.' },
  { title: 'Owner first', text: 'We are paid for our advice, not for closing a deal. Your goals set the direction.' },
  { title: 'Coordination', text: 'We bring your CPA, attorney, and wealth advisor together so decisions are made in the right order.' },
  { title: 'Discretion', text: 'Your company, your family, and your plans stay confidential.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Heiridium"
        title="Your heirs. Your legacy. Your direction."
        intro="Heiridium exists to help trade business owners turn a lifetime of work into lasting wealth for their families."
        crumbs={[{ label: 'About', href: '/about' }]}
      />
      <section className="py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
            <h2 className="text-4xl font-semibold leading-tight text-ink">Why we started</h2>
            <p>
              Many owners of plumbing and HVAC companies spent thirty years building something valuable, then faced the
              biggest financial decision of their lives with little preparation and a lot of unsolicited advice.
            </p>
            <p>
              The name combines heirs and meridian: a reference line that keeps you oriented. The compass in our mark
              stands for the same idea. Know where you are, know where you are going, and decide the route deliberately.
            </p>
            <p>
              Our books and the Heiridium Academy share what we have learned freely. Our advisory work helps owners
              apply it to their own companies and families.
            </p>
          </div>
          <Image
            src="/images/family-table.png"
            alt="A family-business owner talking with his adult children at a kitchen table."
            width={1200}
            height={900}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
        </Container>
      </section>
      <section className="border-t border-border py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="What we believe" title="How we work with owners" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-gold pt-5">
                <h3 className="text-2xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Process />
      <CtaBand />
    </>
  )
}
