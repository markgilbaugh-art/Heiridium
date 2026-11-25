export type TopicSlug =
  | 'business-performance'
  | 'tax-asset-protection'
  | 'exit-readiness'
  | 'succession-wealth'

export type Topic = {
  slug: TopicSlug
  name: string
  bookSlug: string
  accent: 'red' | 'blue' | 'green' | 'purple'
  description: string
  intro: string
  cornerstoneSlug: string
  questions: string[]
}

export const topics: Topic[] = [
  {
    slug: 'business-performance',
    name: 'Business Performance',
    bookSlug: 'build-a-profitable-business',
    accent: 'red',
    description:
      'Guides for business owners on pricing, job costing, the monthly close, cash flow, and leadership that does not depend on the owner.',
    intro:
      'Every exit, succession, or ownership decision starts with numbers you trust. These guides cover the operating habits that produce reliable profit in a service contracting business.',
    cornerstoneSlug: 'why-profit-and-cash-flow-tell-different-stories',
    questions: [
      'Which jobs and service lines actually make money?',
      'Why is there less cash than the P&L suggests?',
      'What should a monthly close include?',
    ],
  },
  {
    slug: 'tax-asset-protection',
    name: 'Tax & Asset Protection',
    bookSlug: 'protect-what-you-built',
    accent: 'blue',
    description:
      'Plain-language guides on entity structure, risk, insurance, and the tax questions business owners should take to a CPA and attorney before a sale.',
    intro:
      'These guides explain the questions to raise and the facts to gather. Tax and legal articles are published only after review by a qualified professional, and they are not a substitute for advice on your situation.',
    cornerstoneSlug: 'what-to-ask-your-cpa-before-signing-a-letter-of-intent',
    questions: [
      'How might sale structure affect what I keep?',
      'What should my CPA see before I sign an LOI?',
      'Which risks would a buyer or heir inherit?',
    ],
  },
  {
    slug: 'exit-readiness',
    name: 'Exit Readiness & M&A',
    bookSlug: 'build-a-sellable-business',
    accent: 'green',
    description:
      'How business owners prepare a company for buyer diligence, reduce founder dependence, and compare offers.',
    intro:
      'Buyers pay for earnings they can verify and a company that runs without its founder. These guides cover readiness, diligence, and how to evaluate an offer.',
    cornerstoneSlug: 'how-to-find-out-if-your-company-can-run-without-you',
    questions: [
      'Could the company run for a month without me?',
      'What will a buyer ask to see?',
      'How do I compare two offers fairly?',
    ],
  },
  {
    slug: 'succession-wealth',
    name: 'Succession & Generational Wealth',
    bookSlug: 'build-generational-wealth',
    accent: 'purple',
    description:
      'Guides for business-owning families on selling versus passing the company down, choosing leaders, preparing heirs, and charitable giving.',
    intro:
      'A sale is one option. Families also transfer ownership to the next generation or keep the company under professional management. These guides help owners frame that decision.',
    cornerstoneSlug: 'sell-the-company-or-pass-it-to-family',
    questions: [
      'Should I sell or keep the company in the family?',
      'Who should lead after me?',
      'How do I prepare heirs to be responsible owners?',
    ],
  },
]

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug)
}
