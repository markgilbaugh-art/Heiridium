import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/sections'
import { industryCategories, industrySpecialties } from '@/lib/content/industries'

export function IndustryGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {industryCategories.map((ind) => {
        const specialties = industrySpecialties.filter((s) => s.parent === ind.slug)
        return (
          <li key={ind.slug} className="flex flex-col border border-border bg-card">
            <Link href={ind.path} className="group flex flex-1 flex-col">
              <Image
                src={ind.image.src}
                alt={ind.image.alt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="flex items-center justify-between gap-4 text-2xl font-semibold text-ink">
                  {ind.name}
                  <ArrowRight className="size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </h3>
                <p className="mt-3 text-muted-foreground">{ind.cardIssue}</p>
              </div>
            </Link>
            {specialties.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border px-7 py-4 text-sm">
                {specialties.map((s) => (
                  <Link key={s.slug} href={s.path} className="font-medium text-ink underline-offset-4 hover:text-gold hover:underline">
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Industries() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who we serve"
          title="For owners building what comes next"
          intro="We work with owners of established businesses across industries. The issues that shape profit and value differ by industry, so each has its own focus and its own Academy guides."
        />
        <div className="mt-14">
          <IndustryGrid />
        </div>
      </Container>
    </section>
  )
}
