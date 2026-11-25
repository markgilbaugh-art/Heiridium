import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_URL } from '@/lib/site'
import { ButtonLink } from './button-link'
import { JsonLd } from './json-ld'

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto max-w-7xl px-5 lg:px-8', className)}>{children}</div>
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('eyebrow text-gold', className)}>{children}</p>
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  tone = 'dark',
}: {
  eyebrow?: string
  title: string
  intro?: string
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && <Eyebrow className={tone === 'light' ? 'text-gold-soft' : undefined}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          'mt-3 text-4xl font-semibold leading-tight md:text-5xl',
          tone === 'light' ? 'text-ivory' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn('mt-5 text-lg leading-relaxed', tone === 'light' ? 'text-ivory/75' : 'text-muted-foreground')}>
          {intro}
        </p>
      )}
    </div>
  )
}

export type Crumb = { label: string; href: string }

export function Breadcrumbs({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Home', href: '/' }, ...items].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  }
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <JsonLd data={ld} />
      <ol className={cn('flex flex-wrap items-center gap-1.5', tone === 'light' ? 'text-ivory/60' : 'text-muted-foreground')}>
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" aria-hidden="true" />
            {i === items.length - 1 ? (
              <span aria-current="page" className={tone === 'light' ? 'text-ivory/90' : 'text-ink'}>
                {c.label}
              </span>
            ) : (
              <Link href={c.href} className="hover:underline">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string
  title: string
  intro?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <section className="bg-ink text-ivory">
      <Container className="py-16 md:py-24">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-8 max-w-4xl">
          {eyebrow && <Eyebrow className="text-gold-soft">{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-5xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ivory/80">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}

export function CtaBand({
  title = 'Start with a private conversation',
  text = 'A confidential first conversation about your company, your timeline, and what you want your family to keep. No obligation and no sales pitch.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="bg-ink text-ivory">
      <Container className="flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-ivory/75">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact">Schedule a Private Conversation</ButtonLink>
          <ButtonLink href="/books" variant="outline-light">
            Explore the Books
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <div className="divide-y divide-border border-y border-border">
      <JsonLd data={ld} />
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl font-semibold text-ink">
            {f.q}
            <span className="text-gold transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn('border-l-2 border-gold pl-4 text-sm text-muted-foreground', className)}>
      This material is general education, not tax, legal, or investment advice. Outcomes depend on your entity,
      ownership, state, and deal terms. Review decisions with your CPA, attorney, and other qualified professionals.
    </p>
  )
}
