import { editorial } from './articles-published'
import type { Article, Industry } from './types'
import type { TopicSlug } from './topics'

type QueueItem = {
  week: 1 | 2 | 3 | 4
  title: string
  slug: string
  topic: TopicSlug
  industries?: Industry[]
  review?: boolean
  books: string[]
  outline: string[]
  status?: Article['status']
}

const DAY = 24 * 60 * 60 * 1000
const QUEUE_START = Date.parse('2026-12-01T13:00:00.000Z')

const queue: QueueItem[] = [
  { week: 1, title: 'How much is my HVAC company worth?', slug: 'how-much-is-my-hvac-company-worth', topic: 'exit-readiness', industries: ['hvac'], books: ['build-a-sellable-business'], outline: ['Adjusted earnings versus revenue', 'What maintenance agreements and service mix signal', 'Why valuation ranges vary by buyer type', 'Facts to gather before asking for a valuation'] },
  { week: 1, title: 'What is a plumbing company worth?', slug: 'what-is-a-plumbing-company-worth', topic: 'exit-readiness', industries: ['plumbing'], books: ['build-a-sellable-business'], outline: ['Service versus project revenue', 'Licensing continuity', 'Customer and builder concentration', 'Documenting earnings'] },
  { week: 2, title: 'How to prepare to sell an HVAC business', slug: 'how-to-prepare-to-sell-an-hvac-business', topic: 'exit-readiness', industries: ['hvac'], books: ['build-a-sellable-business'], outline: ['A three-year readiness timeline', 'Agreement base and dispatch data', 'Technician retention', 'Choosing advisors'] },
  { week: 2, title: 'How to prepare to sell a plumbing business', slug: 'how-to-prepare-to-sell-a-plumbing-business', topic: 'exit-readiness', industries: ['plumbing'], books: ['build-a-sellable-business'], outline: ['Readiness timeline', 'Master license and qualifier planning', 'Crew leadership', 'Clean job costing'] },
  { week: 2, title: 'What belongs in a buyer data room?', slug: 'what-belongs-in-a-buyer-data-room', topic: 'exit-readiness', books: ['build-a-sellable-business'], outline: ['Financial, legal, HR, and operational folders', 'What to prepare before an LOI', 'Access controls'] },
  { week: 2, title: 'Which owner expenses are defensible add-backs?', slug: 'which-owner-expenses-are-defensible-add-backs', topic: 'exit-readiness', review: true, books: ['build-a-sellable-business'], outline: ['What an add-back is', 'Documentation buyers expect', 'Common disputes', 'Questions for your CPA'] },
  { week: 2, title: 'What buyer diligence looks like for a service contractor', slug: 'what-buyer-diligence-looks-like-for-a-service-contractor', topic: 'exit-readiness', books: ['build-a-sellable-business'], outline: ['Financial, operational, and legal diligence', 'Quality of earnings', 'Typical timeline'] },
  { week: 2, title: 'Customer concentration and its effect on a sale', slug: 'customer-concentration-and-its-effect-on-a-sale', topic: 'exit-readiness', books: ['build-a-sellable-business'], outline: ['How concentration is measured', 'Builder and commercial relationships', 'Reducing concentration over time'] },
  { week: 3, title: 'What taxes could I owe when I sell my business?', slug: 'what-taxes-could-i-owe-when-i-sell-my-business', topic: 'tax-asset-protection', review: true, status: 'in-review', books: ['protect-what-you-built', 'build-a-sellable-business'], outline: ['Why entity type, structure, basis, and allocation matter', 'Capital gain versus ordinary income and depreciation recapture', 'State considerations', 'Facts to bring your CPA'] },
  { week: 3, title: 'Asset sale versus equity sale', slug: 'asset-sale-versus-equity-sale', topic: 'tax-asset-protection', review: true, books: ['protect-what-you-built'], outline: ['What transfers in each structure', 'Why buyers and sellers may prefer different structures', 'Questions for your CPA and attorney'] },
  { week: 3, title: 'What depreciation recapture can mean for a fleet-heavy company', slug: 'depreciation-recapture-for-fleet-heavy-companies', topic: 'tax-asset-protection', industries: ['hvac', 'plumbing'], review: true, books: ['protect-what-you-built'], outline: ['How vehicle and equipment depreciation can affect sale taxes', 'Purchase price allocation', 'Facts to gather'] },
  { week: 3, title: 'What to ask your CPA before signing a letter of intent', slug: 'what-to-ask-your-cpa-before-signing-a-letter-of-intent', topic: 'tax-asset-protection', review: true, books: ['protect-what-you-built', 'build-a-sellable-business'], outline: ['Structure and allocation', 'Estimated after-tax proceeds', 'Timing and state taxes'] },
  { week: 3, title: 'Why working capital affects cash at closing', slug: 'why-working-capital-affects-cash-at-closing', topic: 'exit-readiness', review: true, books: ['build-a-sellable-business'], outline: ['What a working capital peg is', 'Seasonality in HVAC and plumbing', 'How adjustments change cash at close'] },
  { week: 3, title: 'Cash at close versus earnouts and seller financing', slug: 'cash-at-close-versus-earnouts-and-seller-financing', topic: 'exit-readiness', review: true, books: ['build-a-sellable-business'], outline: ['How deal consideration is structured', 'Risk you keep after closing', 'Questions for your attorney'] },
  { week: 3, title: 'How to compare two offers by after-tax proceeds and risk', slug: 'how-to-compare-two-offers', topic: 'exit-readiness', review: true, books: ['build-a-sellable-business', 'protect-what-you-built'], outline: ['Headline price versus what you keep', 'Deferred and contingent consideration', 'Employment and non-compete terms'] },
  { week: 4, title: 'Can I retire and keep owning the company?', slug: 'can-i-retire-and-keep-owning-the-company', topic: 'succession-wealth', books: ['build-generational-wealth'], outline: ['Professional management', 'Board and reporting rhythm', 'Risks of absentee ownership'] },
  { week: 4, title: 'How to decide who leads a family business', slug: 'how-to-decide-who-leads-a-family-business', topic: 'succession-wealth', books: ['build-generational-wealth'], outline: ['Ownership versus leadership', 'Readiness criteria', 'Outside leaders'] },
  { week: 4, title: 'Questions to ask an estate attorney before transferring shares', slug: 'questions-for-an-estate-attorney-before-transferring-shares', topic: 'succession-wealth', review: true, books: ['build-generational-wealth', 'protect-what-you-built'], outline: ['Gifts, sales, and trusts', 'Fairness among heirs', 'Documents to bring'] },
  { week: 4, title: 'Preparing heirs to become responsible owners', slug: 'preparing-heirs-to-become-responsible-owners', topic: 'succession-wealth', books: ['build-generational-wealth'], outline: ['Financial literacy', 'Governance and family meetings', 'Stewardship'] },
  { week: 4, title: 'When a family foundation fits a charitable goal', slug: 'when-a-family-foundation-fits-a-charitable-goal', topic: 'succession-wealth', review: true, books: ['build-generational-wealth'], outline: ['Foundations versus donor-advised funds', 'Administration and cost', 'Questions for advisors'] },
  { week: 4, title: 'How to involve key managers in business succession', slug: 'how-to-involve-key-managers-in-business-succession', topic: 'succession-wealth', books: ['build-generational-wealth', 'build-a-sellable-business'], outline: ['Retention and incentive planning', 'Communicating a transition', 'Management buyouts'] },
]

export const queuedArticles: Article[] = queue.map((item, index) => ({
  slug: item.slug,
  title: item.title,
  summary: `Working draft: ${item.outline[0]}.`,
  directAnswer: 'Draft in progress. A direct answer will open the published article.',
  topic: item.topic,
  industries: item.industries ?? ['hvac', 'plumbing', 'home-services'],
  author: editorial,
  requiresProfessionalReview: Boolean(item.review),
  status: item.status ?? 'draft',
  publishAt: new Date(QUEUE_START + index * DAY).toISOString(),
  week: item.week,
  body: [
    { type: 'callout', text: 'Draft outline. Not for publication until written and, where marked, reviewed by a qualified professional.' },
    { type: 'h2', text: 'Planned sections' },
    { type: 'ul', items: item.outline },
  ],
  relatedBooks: item.books,
}))
