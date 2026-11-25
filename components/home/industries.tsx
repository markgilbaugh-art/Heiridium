import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/sections'

const industries = [
  {
    href: '/industries/hvac',
    title: 'HVAC companies',
    image: '/images/hvac.png',
    alt: 'An HVAC technician servicing a residential condenser unit.',
    points: ['Maintenance agreement value', 'Seasonality and dispatch', 'Fleet and equipment', 'Technician retention'],
  },
  {
    href: '/industries/plumbing',
    title: 'Plumbing companies',
    image: '/images/plumbing.png',
    alt: 'A veteran plumber and an apprentice reviewing a job ticket in a pipe warehouse.',
    points: ['Service versus project mix', 'Licensing continuity', 'Crew leadership', 'Builder concentration'],
  },
]

export function Industries() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who we serve"
          title="Built for the trades"
          intro="We work with owner-led home-services companies, most with $3 million to $30 million in revenue. The issues that shape value in HVAC and plumbing are specific, and so is our work."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {industries.map((ind) => (
            <Link key={ind.href} href={ind.href} className="group block border border-border bg-card">
              <Image
                src={ind.image}
                alt={ind.alt}
                width={1200}
                height={900}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-8">
                <h3 className="flex items-center justify-between text-3xl font-semibold text-ink">
                  {ind.title}
                  <ArrowRight className="size-5 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {ind.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 bg-gold" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
