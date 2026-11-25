import type { TopicSlug } from './topics'

export type BookAccent = 'red' | 'blue' | 'green' | 'purple'

export type BookAvailability = 'updates' | 'sample' | 'available'

export type Book = {
  slug: string
  number: 1 | 2 | 3 | 4
  numeral: 'I' | 'II' | 'III' | 'IV'
  title: string
  accent: BookAccent
  accentName: string
  emblem: string
  cover: string
  coverAlt: string
  seoTitle: string
  seoDescription: string
  tagline: string
  readerProfile: string
  startHereIf: string[]
  synopsis: string[]
  chapters: { title: string; summary: string }[]
  takeaways: string[]
  topic: TopicSlug
  relatedServicePath: { label: string; href: string }
  availability: BookAvailability
  sampleUrl?: string
  buyUrl?: string
  isbn?: string
}

export const accentClasses: Record<
  BookAccent,
  { text: string; bg: string; border: string; hex: string }
> = {
  red: { text: 'text-book-red', bg: 'bg-book-red', border: 'border-book-red', hex: '#9b1c2e' },
  blue: { text: 'text-book-blue', bg: 'bg-book-blue', border: 'border-book-blue', hex: '#1e46a8' },
  green: { text: 'text-book-green', bg: 'bg-book-green', border: 'border-book-green', hex: '#1b6e41' },
  purple: {
    text: 'text-book-purple',
    bg: 'bg-book-purple',
    border: 'border-book-purple',
    hex: '#6f2d96',
  },
}

export const books: Book[] = [
  {
    slug: 'build-a-profitable-business',
    number: 1,
    numeral: 'I',
    title: 'Build a Profitable Business',
    accent: 'red',
    accentName: 'Burgundy red',
    emblem: 'Staircase',
    cover: '/images/books/build-a-profitable-business.png',
    coverAlt:
      'Cover of Build a Profitable Business, Heiridium Book I: charcoal bookcloth with a burgundy top stripe and a gold staircase emblem.',
    seoTitle: 'Build a Profitable Business | Heiridium Book I',
    seoDescription:
      'Book I of the Heiridium series gives HVAC, plumbing, and home-services owners a 90-day plan for leadership, pricing, job costing, clean books, and cash flow.',
    tagline: 'A 90-day plan for stronger margins, cleaner books, and a company that runs on process.',
    readerProfile:
      'Owners whose company keeps getting busier while margins and cash flow stay flat, and who suspect the business depends too heavily on them.',
    startHereIf: [
      'Revenue has grown but take-home profit has not kept pace',
      'You are not sure which jobs, trucks, or service lines actually make money',
      'Your books close late or need heavy adjustment before your CPA can use them',
    ],
    synopsis: [
      'Profit is the foundation every later decision is built on. A buyer pays for earnings they can verify, a family inherits the habits that produce them, and an owner can only step back from a company that makes money without heroic effort.',
      'Book I lays out a 90-day plan: establish a leadership rhythm, document the processes that matter most, price work for the margin you need, cost every job, close the books monthly, and manage cash with intent.',
    ],
    chapters: [
      { title: 'Leadership rhythm', summary: 'Weekly and monthly meetings that move decisions off the owner’s desk.' },
      { title: 'Process improvement', summary: 'Documenting dispatch, estimating, and closeout so quality does not depend on who is working.' },
      { title: 'Pricing for margin', summary: 'Building flat-rate and project pricing from real labor, overhead, and target profit.' },
      { title: 'Job costing', summary: 'Seeing the true profit of every job, crew, and service line.' },
      { title: 'Clean books', summary: 'A monthly close your CPA, lender, and a future buyer can rely on.' },
      { title: 'Cash flow', summary: 'Forecasting seasonality, receivables, and capital purchases before they become emergencies.' },
    ],
    takeaways: [
      'A 90-day sequence you can run with your leadership team',
      'A monthly close checklist built for service contractors',
      'Pricing and job-costing worksheets you can adapt',
      'The few numbers worth reviewing every week',
    ],
    topic: 'business-performance',
    relatedServicePath: { label: 'How we improve operations', href: '/how-we-help#operations' },
    availability: 'updates',
  },
  {
    slug: 'protect-what-you-built',
    number: 2,
    numeral: 'II',
    title: 'Protect What You Built',
    accent: 'blue',
    accentName: 'Sapphire blue',
    emblem: 'Shield',
    cover: '/images/books/protect-what-you-built.png',
    coverAlt:
      'Cover of Protect What You Built, Heiridium Book II: charcoal bookcloth with a sapphire blue top stripe and a gold shield emblem.',
    seoTitle: 'Protect What You Built | Heiridium Book II',
    seoDescription:
      'Book II helps trade business owners review ownership structures, risk, trusts, insurance, and pre-transaction tax questions with their CPA and attorney.',
    tagline: 'Ownership, risk, and tax questions to settle before anyone makes you an offer.',
    readerProfile:
      'Owners with a profitable company who have not reviewed their entity structure, insurance, or estate documents in years, and who may face a transaction within five years.',
    startHereIf: [
      'Your entity structure was set up decades ago and never revisited',
      'Real estate, vehicles, and the operating company are owned in one place',
      'You have not discussed sale taxes or estate planning with your CPA and attorney',
    ],
    synopsis: [
      'The decisions that most affect what a family keeps are often made before a buyer appears. Entity type, how assets are held, insurance coverage, and estate documents can all shape after-tax proceeds and family security.',
      'Book II is a guide to the right conversations. It explains the questions to bring to your CPA, attorney, and insurance specialists, and the facts each of them will need from you. It does not replace their advice.',
    ],
    chapters: [
      { title: 'Ownership structures', summary: 'How entity type and ownership of real estate and equipment can affect options later.' },
      { title: 'Business risk', summary: 'Key-person, customer, contract, and liability risks a buyer or heir will inherit.' },
      { title: 'Trusts and estate documents', summary: 'What owners commonly review with an estate attorney, and when.' },
      { title: 'Insurance', summary: 'Coverage gaps worth raising with a qualified insurance specialist.' },
      { title: 'Tax planning before a transaction', summary: 'Why basis, structure, and allocation matter, and what to ask a CPA early.' },
    ],
    takeaways: [
      'A risk inventory for a service contractor',
      'Questions to take to your CPA and estate attorney',
      'A timeline for planning that has to start years, not weeks, before a deal',
      'A clear picture of which professionals to involve and why',
    ],
    topic: 'tax-asset-protection',
    relatedServicePath: { label: 'Tax planning before a sale', href: '/tax-planning-before-a-sale' },
    availability: 'updates',
  },
  {
    slug: 'build-a-sellable-business',
    number: 3,
    numeral: 'III',
    title: 'Build a Sellable Business',
    accent: 'green',
    accentName: 'Emerald green',
    emblem: 'Bridge',
    cover: '/images/books/build-a-sellable-business.png',
    coverAlt:
      'Cover of Build a Sellable Business, Heiridium Book III: charcoal bookcloth with an emerald green top stripe and a gold bridge emblem.',
    seoTitle: 'Build a Sellable Business | Heiridium Book III',
    seoDescription:
      'Book III shows HVAC and plumbing owners how to reduce founder dependence, document reliable earnings, prepare for buyer diligence, and compare offers.',
    tagline: 'Make your company something a buyer can verify, finance, and run without you.',
    readerProfile:
      'Owners who are considering a sale in the next one to five years, or who have already been approached by a buyer or private equity group.',
    startHereIf: [
      'A buyer, broker, or private equity firm has already called',
      'Customers, vendors, and technicians still expect to deal with you personally',
      'You want to compare offers on what you keep, not just the headline price',
    ],
    synopsis: [
      'A buyer pays for the future, and discounts anything they cannot verify. The more a company depends on its founder, the harder its earnings are to finance and the more of the price shifts into earnouts and seller notes.',
      'Book III shows how to build founder independence, secure the assets a buyer expects to receive, present reliable earnings, prepare for diligence, take the company to market, and weigh offers by after-tax proceeds and risk.',
    ],
    chapters: [
      { title: 'Founder independence', summary: 'Moving relationships, decisions, and know-how from the owner to the team.' },
      { title: 'Trademark and IP ownership', summary: 'Confirming the company owns its name, domain, phone numbers, and software accounts.' },
      { title: 'Reliable earnings', summary: 'Recurring revenue, clean add-backs, and a quality-of-earnings mindset.' },
      { title: 'Buyer diligence', summary: 'What a data room contains and how to prepare one before it is requested.' },
      { title: 'Taking the company to market', summary: 'Working with M&A advisors and choosing the right kind of buyer.' },
      { title: 'Comparing offers', summary: 'Cash at close, earnouts, seller financing, working capital, and after-tax outcomes.' },
    ],
    takeaways: [
      'A founder-dependence scorecard',
      'A buyer data room checklist',
      'A framework for comparing offers on after-tax proceeds and risk',
      'Questions for your M&A advisor, CPA, and attorney before an LOI',
    ],
    topic: 'exit-readiness',
    relatedServicePath: { label: 'Exit planning for owners', href: '/exit-planning' },
    availability: 'updates',
  },
  {
    slug: 'build-generational-wealth',
    number: 4,
    numeral: 'IV',
    title: 'Build Generational Wealth',
    accent: 'purple',
    accentName: 'Royal purple',
    emblem: 'Tree',
    cover: '/images/books/build-generational-wealth.png',
    coverAlt:
      'Cover of Build Generational Wealth, Heiridium Book IV: charcoal bookcloth with a royal purple top stripe and a gold tree emblem.',
    seoTitle: 'Build Generational Wealth | Heiridium Book IV',
    seoDescription:
      'Book IV guides business-owning families through succession, trusts, ownership versus leadership, preparing heirs, and charitable giving.',
    tagline: 'Turn a lifetime of work into something your family can carry forward.',
    readerProfile:
      'Owners deciding whether to sell, pass the company to family, or keep ownership under professional management, and families preparing the next generation.',
    startHereIf: [
      'You are weighing a sale against a family transfer',
      'A son, daughter, or key manager may want to lead the company',
      'You want your wealth to support your family and causes for decades',
    ],
    synopsis: [
      'Generational wealth is built on decisions, not just dollars. Who owns the company, who leads it, how heirs are prepared, and how the family gives back all shape whether wealth lasts beyond one generation.',
      'Book IV separates ownership from leadership, walks through family transfer and professional management, outlines the role of trusts and estate planning, and explains how families prepare heirs and structure charitable goals.',
    ],
    chapters: [
      { title: 'Family succession', summary: 'Options for transferring a company inside the family and what each requires.' },
      { title: 'Ownership versus leadership', summary: 'Why the heir to the shares and the next leader do not have to be the same person.' },
      { title: 'Trusts', summary: 'How families commonly use trusts, and the questions to bring to an estate attorney.' },
      { title: 'Preparing heirs', summary: 'Building judgment, financial literacy, and a sense of stewardship.' },
      { title: 'Charitable giving', summary: 'When donor-advised funds or a family foundation may fit a family’s goals.' },
    ],
    takeaways: [
      'A decision framework for sell, transfer, or retain',
      'A family meeting agenda for succession conversations',
      'An heir-readiness checklist',
      'Questions for estate, tax, and philanthropic advisors',
    ],
    topic: 'succession-wealth',
    relatedServicePath: { label: 'Family succession planning', href: '/succession-planning' },
    availability: 'updates',
  },
]

export function getBook(slug: string) {
  return books.find((b) => b.slug === slug)
}

export function getNextBook(book: Book) {
  return books[book.number % books.length]
}
