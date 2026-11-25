import type { Metadata } from 'next'
import { IndustryGrid } from '@/components/home/industries'
import { Container, CtaBand, PageHero } from '@/components/site/sections'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Who We Serve: Owners of Established Businesses',
  description:
    'Heiridium works with owners of established retail, construction and trades, e-commerce, professional services, and technology and IT services businesses.',
  path: '/industries',
})

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Who we serve"
        title="For owners building what comes next"
        intro="We work with owners of established businesses who want stronger profit, a company that can run without them, and a plan for what their family keeps."
        crumbs={[{ label: 'Who We Serve', href: '/industries' }]}
      />
      <section className="py-20 md:py-24">
        <Container>
          <IndustryGrid />
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
