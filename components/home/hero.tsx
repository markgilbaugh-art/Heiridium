import Image from 'next/image'
import { ButtonLink } from '@/components/site/button-link'
import { Container } from '@/components/site/sections'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow text-gold-soft">Business consulting · Acquisitions · Generational wealth</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] md:text-7xl">
            {'Heiridium transforms your business into generational wealth.'}
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-ivory/80">
            Build a more profitable company, prepare for a successful sale, or explore a direct acquisition by Heiridium. We help turn decades of hard work into a retirement and a legacy for your family.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Schedule a Private Conversation</ButtonLink>
            <ButtonLink href="/exit-planning" variant="outline-light">
              Explore Your Exit Options
            </ButtonLink>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ivory/15 pt-8">
            {[
              ['Improve', 'Operations'],
              ['Transition', 'Acquisitions'],
              ['Preserve', 'Family wealth'],
            ].map(([term, def]) => (
              <div key={term}>
                <dt className="font-serif text-2xl font-semibold text-ivory">{term}</dt>
                <dd className="mt-1 text-sm text-ivory/60">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <Image
            src="/images/hero-leadership.png"
            alt="A business owner meeting with members of her leadership team around a conference table."
            width={1376}
            height={768}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/5] w-full object-cover object-[55%_center] lg:aspect-[4/5]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gold" aria-hidden="true" />
        </div>
      </Container>
    </section>
  )
}
