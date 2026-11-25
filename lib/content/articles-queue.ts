import { ALL_INDUSTRIES, editorial } from './articles-published'
import type { Article, Industry } from './types'
import type { TopicSlug } from './topics'

type QueueItem = {
  week: 2 | 3 | 4
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
  { week: 2, title: 'Reduce external retail theft with layout, visibility, and inventory controls', slug: 'reduce-external-retail-theft', topic: 'tax-asset-protection', industries: ['retail'], books: ['protect-what-you-built', 'build-a-profitable-business'], outline: ['Sight lines, fixture height, and entrance placement', 'Protecting high-theft merchandise', 'Cycle counts on targeted categories', 'Staff greeting and floor coverage', 'Working with local law enforcement'] },
  { week: 2, title: 'Reduce employee-related retail losses with POS permissions and reconciliation', slug: 'reduce-employee-related-retail-losses', topic: 'tax-asset-protection', industries: ['retail'], books: ['protect-what-you-built', 'build-a-profitable-business'], outline: ['Role-based POS permissions', 'Daily refund, void, and no-sale review', 'Inventory reconciliation by department', 'Separating receiving from recording', 'Handling a suspected loss fairly and lawfully'] },
  { week: 2, title: 'IT infrastructure security checklist for business owners', slug: 'it-infrastructure-security-checklist', topic: 'tax-asset-protection', books: ['protect-what-you-built'], outline: ['Multi-factor authentication on email, banking, and admin accounts', 'Patching schedules for devices and network equipment', 'Quarterly access reviews', 'Backups that are tested by restoring them', 'When to bring in a specialist for remediation'] },
  { week: 2, title: 'Reduce unauthorized account access and payment fraud in e-commerce', slug: 'reduce-ecommerce-account-takeover-and-payment-fraud', topic: 'tax-asset-protection', industries: ['ecommerce'], books: ['protect-what-you-built'], outline: ['Securing admin, platform, and payment accounts', 'Customer account takeover signals', 'Fraud screening and chargeback review', 'Refund abuse and policy design'] },
  { week: 2, title: 'Build a repeatable employee offboarding checklist', slug: 'build-an-employee-offboarding-checklist', topic: 'tax-asset-protection', industries: ['professional-services'], books: ['protect-what-you-built', 'build-a-sellable-business'], outline: ['Revoking system and client-portal access the same day', 'Recovering devices and files', 'Client communication and relationship handoff', 'Confidentiality and restrictive covenants to review with counsel'] },
  { week: 2, title: 'Control purchasing and reduce unexplained material losses', slug: 'control-purchasing-and-material-losses', topic: 'business-performance', industries: ['construction-trades', 'hvac', 'plumbing'], books: ['build-a-profitable-business', 'protect-what-you-built'], outline: ['Purchase order approval limits', 'Matching supplier invoices to jobs', 'Truck and yard stock counts', 'Returns and credits that never arrive'] },
  { week: 3, title: 'Build an e-commerce marketing plan around acquisition cost, repeat purchases, and margins', slug: 'ecommerce-marketing-plan-acquisition-cost-repeat-purchases-margins', topic: 'business-performance', industries: ['ecommerce'], books: ['build-a-profitable-business', 'build-a-sellable-business'], outline: ['Setting a maximum customer acquisition cost from contribution margin', 'Payback period by channel', 'Repeat purchase rate and cohort tracking', 'Allocating budget between prospecting and retention', 'Reporting buyers expect to see'] },
  { week: 3, title: 'Measure which retail promotions generate incremental profit', slug: 'measure-incremental-profit-from-retail-promotions', topic: 'business-performance', industries: ['retail'], books: ['build-a-profitable-business'], outline: ['Baseline sales without the promotion', 'Margin given up versus units gained', 'Halo and cannibalization effects', 'A simple post-promotion review'] },
  { week: 3, title: 'Track HVAC maintenance agreement renewals and profitability', slug: 'track-hvac-maintenance-agreement-renewals-and-profitability', topic: 'business-performance', industries: ['hvac'], books: ['build-a-profitable-business', 'build-a-sellable-business'], outline: ['Renewal rate by cohort', 'Cost to service each agreement', 'Conversion of visits into repair and replacement work', 'Reporting a buyer will request'] },
  { week: 3, title: 'Reduce founder dependence in sales and client relationships', slug: 'reduce-founder-dependence-in-client-relationships', topic: 'exit-readiness', industries: ['professional-services'], books: ['build-a-sellable-business'], outline: ['Mapping which clients rely on the founder', 'Introducing a second relationship lead', 'Moving business development into a team process', 'How buyers evaluate relationship transfer'] },
  { week: 3, title: 'Document client environments and operational handoffs', slug: 'document-client-environments-and-handoffs', topic: 'exit-readiness', industries: ['technology-it-services'], books: ['build-a-sellable-business'], outline: ['What every client environment record should contain', 'Runbooks for common requests', 'Credential management and access ownership', 'Handoffs between engineers and shifts'] },
  { week: 3, title: 'What buyers look for in clean financials', slug: 'what-buyers-look-for-in-clean-financials', topic: 'exit-readiness', books: ['build-a-sellable-business', 'build-a-profitable-business'], outline: ['Accrual-basis statements and a consistent monthly close', 'Reconciled balance sheet accounts', 'Separating owner expenses', 'Revenue and margin by line of business'] },
  { week: 3, title: 'What to include in a buyer data room', slug: 'what-belongs-in-a-buyer-data-room', topic: 'exit-readiness', books: ['build-a-sellable-business'], outline: ['Financial, legal, HR, and operational folders', 'What to prepare before an LOI', 'Access controls'] },
  { week: 4, title: 'Tax questions to bring to your CPA before signing a letter of intent', slug: 'what-to-ask-your-cpa-before-signing-a-letter-of-intent', topic: 'tax-asset-protection', review: true, status: 'in-review', books: ['protect-what-you-built', 'build-a-sellable-business'], outline: ['Asset versus equity sale', 'Basis and purchase price allocation', 'Capital gain versus ordinary income', 'Estimating after-tax proceeds', 'Facts to bring your CPA'] },
  { week: 4, title: 'Prepare a store manager to take over more decisions', slug: 'prepare-a-store-manager-to-take-over-more-decisions', topic: 'succession-wealth', industries: ['retail'], books: ['build-a-sellable-business', 'build-generational-wealth'], outline: ['Decisions to delegate first', 'Spending and markdown authority', 'Weekly store scorecard', 'Building a bench across locations'] },
  { week: 4, title: 'Prepare a second-in-command before you step back', slug: 'prepare-a-second-in-command-before-you-step-back', topic: 'succession-wealth', industries: ['construction-trades', 'hvac', 'plumbing'], books: ['build-a-sellable-business', 'build-generational-wealth'], outline: ['Choosing the right person', 'Transferring estimating, pricing, and customer authority', 'Retention and incentive planning', 'A step-back timeline'] },
  { week: 4, title: 'Prepare marketing accounts, trademarks, and fulfillment contracts for buyer review', slug: 'prepare-ecommerce-accounts-trademarks-and-contracts-for-buyer-review', topic: 'exit-readiness', industries: ['ecommerce'], review: true, books: ['build-a-sellable-business', 'protect-what-you-built'], outline: ['Ad, platform, and marketplace account ownership', 'Trademark registrations to review with counsel', 'Supplier and 3PL contract assignment terms', 'Customer data and consent records'] },
  { week: 4, title: 'Separate family ownership from leadership', slug: 'separate-family-ownership-from-leadership', topic: 'succession-wealth', books: ['build-generational-wealth'], outline: ['Owners, board, and managers as distinct roles', 'When a family member should lead', 'Hiring professional management', 'Governance documents to discuss with counsel'] },
  { week: 4, title: 'How to compare offers by cash at closing, risk, and after-tax proceeds', slug: 'how-to-compare-offers-by-cash-risk-and-after-tax-proceeds', topic: 'exit-readiness', review: true, books: ['build-a-sellable-business', 'protect-what-you-built'], outline: ['Cash at close versus earnouts and seller financing', 'Working capital targets', 'Escrows, holdbacks, and indemnities', 'Modeling after-tax proceeds with your CPA'] },
]

export const queuedArticles: Article[] = queue.map((item, index) => ({
  slug: item.slug,
  title: item.title,
  summary: `Working draft: ${item.outline[0]}.`,
  directAnswer: 'Draft in progress. A direct answer will open the published article.',
  topic: item.topic,
  industries: item.industries ?? ALL_INDUSTRIES,
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
