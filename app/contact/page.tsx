import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { ConsultationForm } from '@/components/forms/consultation-form'
import { Container, PageHero } from '@/components/site/sections'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Schedule a Private Conversation | Heiridium',
  description:
    'Request a confidential conversation about your plumbing, HVAC, or home-services company, its value, and your options for a sale or family succession.',
  path: '/contact',
})

const expectations = [
  'A reply within two business days to set a time',
  'A 45-minute confidential conversation, by phone or video',
  'No preparation required, and no obligation',
  'An honest view of where to start, even if it is not with us',
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Private conversation"
        title="Start with a confidential conversation"
        intro="Tell us a little about your company and what is on your mind. Everything you share stays between you and our team."
        crumbs={[{ label: 'Contact', href: '/contact' }]}
      />
      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-semibold text-ink">What to expect</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {expectations.map((e) => (
                <li key={e} className="flex gap-3 text-ink">
                  <span className="mt-3 h-0.5 w-4 shrink-0 bg-gold" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <Lock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <p>We never share your information or contact your employees, customers, or vendors.</p>
            </div>
          </div>
          <ConsultationForm />
        </Container>
      </section>
    </>
  )
}
