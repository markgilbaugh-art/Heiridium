import Link from 'next/link'
import { books } from '@/lib/content/books'
import { topics } from '@/lib/content/topics'
import { Logo } from './logo'

const planning = [
  { label: 'How We Help', href: '/how-we-help' },
  { label: 'Exit planning', href: '/exit-planning' },
  { label: 'Tax planning before a sale', href: '/tax-planning-before-a-sale' },
  { label: 'Succession planning', href: '/succession-planning' },
  { label: 'HVAC companies', href: '/industries/hvac' },
  { label: 'Plumbing companies', href: '/industries/plumbing' },
]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-sm leading-relaxed">
              Advisory for business-owning families: stronger profit, ready-to-transfer companies, and wealth built to
              last for generations.
            </p>
            <Link href="/contact" className="mt-6 inline-block text-sm text-gold-soft underline-offset-4 hover:underline">
              Schedule a Private Conversation
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <FooterColumn title="Planning" links={planning} />
            <FooterColumn
              title="The Four Books"
              links={[
                { label: 'Series overview', href: '/books' },
                ...books.map((b) => ({ label: `${b.numeral}. ${b.title}`, href: `/books/${b.slug}` })),
              ]}
            />
            <FooterColumn
              title="Academy"
              links={[
                { label: 'All guides', href: '/academy' },
                ...topics.map((t) => ({ label: t.name, href: `/academy/topics/${t.slug}` })),
                { label: 'About Heiridium', href: '/about' },
              ]}
            />
          </div>
        </div>

        <div className="rule-gold mt-14" />
        <div className="mt-8 flex flex-col gap-4 text-xs leading-relaxed text-ivory/60 md:flex-row md:justify-between">
          <p className="max-w-3xl">
            Heiridium provides business advisory and planning coordination. We do not provide tax, legal, or investment
            advice. Tax, legal, insurance, and portfolio decisions should be made with your CPA, attorney, and other
            qualified, independent professionals.
          </p>
          <p>{`© ${new Date().getFullYear()} Heiridium. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow font-sans text-gold-soft">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-ivory">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
