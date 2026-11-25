import type { ServicePageData } from '@/components/site/service-page'

export const exitPlanning: ServicePageData = {
  path: '/exit-planning',
  serviceName: 'Business exit planning for established business owners',
  crumbs: [{ label: 'Exit planning', href: '/exit-planning' }],
  eyebrow: 'Exit planning',
  title: 'Exit planning for owners who want to sell on their terms',
  intro:
    'Prepare your company for a sale years before you need one, so you choose the buyer, the timing, and the terms.',
  image: {
    src: '/images/hero-owner.png',
    alt: 'A company owner standing in his parts shop as technicians prepare a service van.',
  },
  problem: {
    title: 'Most owners start preparing too late',
    paragraphs: [
      'Many owners begin thinking about a sale when a buyer calls or their health changes. By then, the easy improvements to value, records, and leadership are no longer easy.',
      'Buyers pay for earnings they can verify and a company that runs without its founder. Both take time to build. Starting three to five years ahead gives you room to raise profit, reduce dependence on you, and make tax and structure decisions while they still matter.',
    ],
  },
  pillars: [
    { title: 'Value drivers', text: 'Understand what raises or lowers your multiple: recurring revenue, service mix, margins, concentration, and leadership depth.' },
    { title: 'Founder independence', text: 'Build a management layer and documented systems so the company performs without you on every job and every call.' },
    { title: 'Clean financials', text: 'Monthly closes, job costing, and documented add-backs that hold up in a quality-of-earnings review.' },
    { title: 'Buyer options', text: 'Compare private equity platforms, strategic buyers, employees, and family, and what each typically values.' },
    { title: 'Advisor coordination', text: 'Work with your CPA, attorney, and M&A advisor early so structure and tax questions are on the table before an LOI.' },
    { title: 'Life after the sale', text: 'Plan what you will do next, what your family needs, and how proceeds fit a long-term wealth plan.' },
  ],
  checklist: {
    title: 'Exit-readiness checklist',
    items: [
      'Three years of reviewed or reconciled financial statements',
      'A documented list of owner add-backs with support',
      'A leader other than you who runs daily operations',
      'Recurring revenue tracked by agreement, renewal, and churn',
      'Key customer and vendor relationships owned by the team',
      'Licenses, permits, and qualifiers that survive a transfer',
      'Real estate, vehicles, and equipment ownership clarified',
      'A current estate plan and buy-sell agreement',
    ],
  },
  bookSlugs: ['build-a-sellable-business', 'build-a-profitable-business'],
  faqs: [
    { q: 'How early should I start planning an exit?', a: 'Ideally three to five years before you expect to sell. That window allows time to raise documented earnings, build leadership, and plan structure with your CPA and attorney.' },
    { q: 'Do you sell businesses?', a: 'No. Heiridium prepares owners and companies for a transition and coordinates with your M&A advisor or broker if you engage one. We do not take a success fee on a sale.' },
    { q: 'Can you tell me what my company is worth?', a: 'We help you understand the factors buyers weigh and where your company stands. A formal valuation, if you need one, should come from a qualified valuation professional.' },
    { q: 'What if I am not sure I want to sell?', a: 'That is common. The work that makes a company sellable also makes it more profitable and easier to own, whether you sell, transfer to family, or keep it.' },
  ],
}

export const taxPlanning: ServicePageData = {
  path: '/tax-planning-before-a-sale',
  serviceName: 'Pre-sale tax and structure planning coordination',
  crumbs: [{ label: 'Tax planning before a sale', href: '/tax-planning-before-a-sale' }],
  eyebrow: 'Tax planning before a sale',
  title: 'Plan for what you keep, not just the sale price',
  intro:
    'Entity type, deal structure, timing, and your estate plan can change how much of a sale reaches your family. Those questions are easiest to address years before a buyer arrives.',
  problem: {
    title: 'The headline price is not your number',
    paragraphs: [
      'Two offers with the same price can leave very different amounts after taxes, depending on whether the deal is structured as an asset or stock sale, how the price is allocated, and how payments are timed.',
      'Heiridium does not provide tax or legal advice. We help you organize the facts, frame the right questions, and bring your CPA and attorney into the conversation early, while there is still time to act on their recommendations.',
    ],
  },
  checklist: {
    title: 'Questions to bring to your CPA and attorney',
    items: [
      'Is our current entity type the right one for a likely sale?',
      'How would an asset sale compare with a stock or equity sale for us?',
      'How might the purchase price be allocated, and what does that change?',
      'Should real estate stay with the family and be leased to a buyer?',
      'What would an earnout or seller note mean for taxes and risk?',
      'What estate and gifting steps make sense before a transaction?',
      'Which state and local tax issues apply to our situation?',
    ],
  },
  pillars: [
    { title: 'Deal structure literacy', text: 'Understand asset versus stock sales, allocation, earnouts, seller notes, and rollover equity in plain language.' },
    { title: 'Timing', text: 'Identify decisions that must happen years, months, or weeks before closing, and build them into your timeline.' },
    { title: 'Real estate and assets', text: 'Decide what stays with the family, what transfers, and how ownership is documented.' },
    { title: 'Estate coordination', text: 'Align your estate plan, buy-sell agreement, and gifting strategy with a possible transaction.' },
    { title: 'Advisor team', text: 'Assemble and brief a CPA, attorney, and wealth advisor so they work from the same facts and goals.' },
    { title: 'After-tax planning', text: 'Model scenarios with your CPA so you know the range of what you might keep, not just what you might sell for.' },
  ],
  bookSlugs: ['protect-what-you-built', 'build-a-sellable-business'],
  faqs: [
    { q: 'Do you give tax advice?', a: 'No. Heiridium is not a CPA or law firm. We help you prepare and coordinate with your own tax and legal professionals, who make the recommendations.' },
    { q: 'When should tax planning for a sale start?', a: 'Some strategies require years of lead time, such as entity changes or estate planning steps. Starting two to five years ahead keeps more options available.' },
    { q: 'Why does asset versus stock sale matter?', a: 'Buyers and sellers often prefer different structures, and the choice affects how proceeds are taxed and which liabilities transfer. Your CPA and attorney can explain the effect for your situation.' },
    { q: 'Can I keep my real estate when I sell?', a: 'Often, yes. Many owners keep the building and lease it to the buyer. Whether that fits depends on your goals, the buyer, and advice from your professionals.' },
  ],
  showDisclaimer: true,
}

export const successionPlanning: ServicePageData = {
  path: '/succession-planning',
  serviceName: 'Family business succession planning',
  crumbs: [{ label: 'Succession planning', href: '/succession-planning' }],
  eyebrow: 'Family succession planning',
  title: 'Pass the business, or its wealth, to the next generation',
  intro:
    'Decide whether your family should own the company, run it, or benefit from its proceeds, and prepare everyone for the role they will play.',
  image: {
    src: '/images/family-table.png',
    alt: 'Three generations of a business-owning family talking around a kitchen table.',
  },
  problem: {
    title: 'Ownership and leadership are different decisions',
    paragraphs: [
      'Many family transitions struggle because one person is expected to inherit both ownership and the job of running the company. Those can be separated, and often should be.',
      'A good succession plan answers who will own, who will lead, how heirs who do not work in the business are treated fairly, and how the founder is paid. It is written down and discussed long before it is needed.',
    ],
  },
  pillars: [
    { title: 'Family alignment', text: 'Structured conversations about goals, fairness, and roles, so expectations are clear before decisions are made.' },
    { title: 'Leadership development', text: 'A plan to prepare a family member or professional manager to lead, with milestones and honest feedback.' },
    { title: 'Ownership transfer', text: 'Frame options for gifting, selling to heirs, or trusts with your attorney and CPA.' },
    { title: 'Founder income', text: 'Make sure the transition supports your retirement without straining the company.' },
    { title: 'Fair treatment of heirs', text: 'Balance the interests of children who work in the business and those who do not.' },
    { title: 'Family wealth governance', text: 'Set up how the family will make decisions about shared wealth over decades.' },
  ],
  checklist: {
    title: 'Before a family transfer',
    items: [
      'A written vision of who will own and who will lead',
      'An honest assessment of the successor’s readiness',
      'A buy-sell agreement and current estate documents',
      'A plan for heirs outside the business',
      'Retirement income that does not depend on goodwill alone',
      'A timeline the whole family has discussed',
    ],
  },
  bookSlugs: ['build-generational-wealth', 'protect-what-you-built'],
  faqs: [
    { q: 'Should I sell to an outside buyer or pass the company to family?', a: 'It depends on your successor’s readiness and interest, your retirement needs, and family dynamics. We help you compare both paths with clear criteria.' },
    { q: 'How do I treat children fairly if only one works in the business?', a: 'Fair is not always equal. Families use different ownership classes, life insurance, or other assets to balance outcomes. Your attorney can advise on specific structures.' },
    { q: 'How long does a family succession take?', a: 'Commonly five to ten years when leadership development is involved. Ownership transfer can be faster, but should follow a documented plan.' },
    { q: 'Can a professional manager run the company while my family owns it?', a: 'Yes. Separating ownership and leadership is a common and often effective approach for owner-led businesses.' },
  ],
  showDisclaimer: true,
}

export const howWeHelp: ServicePageData = {
  path: '/how-we-help',
  serviceName: 'Business advisory for established business owners',
  crumbs: [{ label: 'How We Help', href: '/how-we-help' }],
  eyebrow: 'How we help',
  title: 'One path, from a stronger company to a lasting legacy',
  intro:
    'Heiridium helps owner-led companies improve operations, protect what has been built, prepare for a transition, and plan for the family’s future.',
  problem: {
    title: 'A company built over decades deserves a deliberate next chapter',
    paragraphs: [
      'Most owners we work with are in their 50s or 60s, have built an established company, and have never sold a business before. They want honest guidance, not a pitch.',
      'Our work follows the same four stages as the Heiridium books. Some owners start at the beginning. Others arrive a year before a sale. We meet you where your company is today.',
    ],
  },
  checklist: {
    title: 'Owners usually call us when',
    items: [
      'Revenue has grown, but profit and cash have not kept pace',
      'Everything still runs through the owner',
      'A buyer or private equity firm has reached out',
      'The family is asking what happens next',
      'Their estate plan or structure has not been reviewed in years',
      'They want to retire within five to ten years',
    ],
  },
  pillars: [
    { title: 'Operations', text: 'Pricing, job costing, a monthly close, KPIs, and the leadership structure that lets the company run without you.' },
    { title: 'Protection', text: 'Entity, insurance, asset ownership, contracts, and estate coordination with your professionals.' },
    { title: 'Exit readiness', text: 'Value drivers, buyer-ready records, diligence preparation, and advisor coordination for a sale.' },
    { title: 'Succession', text: 'Family alignment, leadership development, and ownership transfer planning.' },
    { title: 'Wealth planning', text: 'Coordinate with wealth and estate professionals on how proceeds serve your family for generations.' },
    { title: 'Advisor coordination', text: 'We act as the steady point of contact across your CPA, attorney, banker, and M&A advisor.' },
  ],
  bookSlugs: ['build-a-profitable-business', 'build-a-sellable-business'],
  faqs: [
    { q: 'What size companies do you work with?', a: 'We work with owners of established, owner-led businesses who want stronger profit, a company that runs without them, and a plan for a sale or family transition.' },
    { q: 'Do you replace my CPA or attorney?', a: 'No. We work alongside them. They provide tax and legal advice; we help prepare the company and coordinate the plan.' },
    { q: 'How do engagements start?', a: 'With a confidential conversation about your company and goals. If there is a fit, we begin with an assessment and a prioritized plan.' },
    { q: 'Which industries do you work with?', a: 'Retail, construction and trades (including HVAC and plumbing), e-commerce, professional services, and technology and IT services.' },
  ],
}

export const hvac: ServicePageData = {
  path: '/industries/hvac',
  serviceName: 'Exit and succession planning for HVAC companies',
  crumbs: [
    { label: 'Who We Serve', href: '/industries' },
    { label: 'Construction & Trades', href: '/industries/construction-trades' },
    { label: 'HVAC companies', href: '/industries/hvac' },
  ],
  eyebrow: 'HVAC companies',
  title: 'Exit and succession planning for HVAC company owners',
  intro:
    'Understand what drives the value of your HVAC company, from maintenance agreements to technician retention, and prepare it for a sale or family transition.',
  image: {
    src: '/images/hvac.png',
    alt: 'An HVAC technician servicing a residential condenser unit beside a company van.',
  },
  problem: {
    title: 'What buyers look at in an HVAC company',
    paragraphs: [
      'HVAC buyers focus on recurring revenue and predictability. A strong maintenance agreement base, healthy replacement sales, and steady technician retention usually matter more than peak-season revenue.',
      'Seasonality, dispatch performance, fleet condition, and how much of the company depends on the owner all shape how a buyer views risk and price.',
    ],
  },
  pillars: [
    { title: 'Maintenance agreements', text: 'Track agreement count, renewal rate, and revenue per agreement as an asset, not an afterthought.' },
    { title: 'Service and replacement mix', text: 'Show how service calls convert to replacements and how margins differ by work type.' },
    { title: 'Seasonality', text: 'Present monthly results and cash planning that show a buyer how you manage peaks and troughs.' },
    { title: 'Technicians and leadership', text: 'Retention, training, and a service manager who runs dispatch without you.' },
    { title: 'Fleet and equipment', text: 'Document ownership, condition, and replacement plans for vans and tools.' },
    { title: 'Commercial versus residential', text: 'Understand how each segment, and any concentration, affects value.' },
  ],
  checklist: {
    title: 'HVAC readiness snapshot',
    items: [
      'Maintenance agreement count, renewal rate, and revenue',
      'Replacement close rate and average ticket',
      'Gross margin by service, replacement, and new construction',
      'Technician tenure and turnover',
      'Monthly financials that show seasonality clearly',
      'Fleet list with ownership and age',
    ],
  },
  bookSlugs: ['build-a-sellable-business', 'build-a-profitable-business'],
  faqs: [
    { q: 'How much is my HVAC company worth?', a: 'Value is usually based on adjusted earnings and the risk a buyer sees in them. Recurring agreements, margin, leadership depth, and concentration all move the range. A qualified valuation professional can provide a formal estimate.' },
    { q: 'Why do buyers care so much about maintenance agreements?', a: 'Agreements produce predictable revenue and lead to future replacement work, which reduces risk for a buyer.' },
    { q: 'Are private equity buyers active in HVAC?', a: 'Many HVAC owners report outreach from private equity backed platforms. Each buyer type values different things, so preparation matters regardless of who calls.' },
    { q: 'Can my service manager take over instead of selling?', a: 'Sometimes. Internal and family transitions require planning for financing, leadership, and ownership. We help you compare that path with an outside sale.' },
  ],
}

export const plumbing: ServicePageData = {
  path: '/industries/plumbing',
  serviceName: 'Exit and succession planning for plumbing companies',
  crumbs: [
    { label: 'Who We Serve', href: '/industries' },
    { label: 'Construction & Trades', href: '/industries/construction-trades' },
    { label: 'Plumbing companies', href: '/industries/plumbing' },
  ],
  eyebrow: 'Plumbing companies',
  title: 'Exit and succession planning for plumbing company owners',
  intro:
    'Prepare your plumbing company for a sale or family transition, from service mix and licensing to crew leadership and builder relationships.',
  image: {
    src: '/images/plumbing.png',
    alt: 'A veteran plumbing company owner and an apprentice reviewing a job ticket in a pipe warehouse.',
  },
  problem: {
    title: 'What buyers look at in a plumbing company',
    paragraphs: [
      'Plumbing buyers weigh the balance between service work and project or new-construction revenue. Service work is often viewed as more predictable, while builder work can bring concentration risk.',
      'Licensing is a frequent sticking point. If the owner is the master plumber or qualifier for the company, a buyer will want a clear plan for licensing continuity after closing.',
    ],
  },
  pillars: [
    { title: 'Service versus project mix', text: 'Show revenue and margin by work type so buyers can see what is recurring and what is project-based.' },
    { title: 'Licensing continuity', text: 'Plan for master license and qualifier coverage well before a transition.' },
    { title: 'Crew leadership', text: 'Develop foremen and a service manager who run the schedule and the customer relationship.' },
    { title: 'Job costing', text: 'Accurate costs by job type that support pricing and show buyers real margins.' },
    { title: 'Builder concentration', text: 'Understand and, where needed, reduce dependence on a small number of contractors or builders.' },
    { title: 'Warranty and callbacks', text: 'Track and document warranty exposure so it does not surprise a buyer in diligence.' },
  ],
  checklist: {
    title: 'Plumbing readiness snapshot',
    items: [
      'Revenue and margin split by service, remodel, and new construction',
      'Licensing and qualifier plan that survives your departure',
      'Top ten customers as a share of revenue',
      'Job costing reconciled to financial statements',
      'Crew leaders who run jobs without the owner',
      'Warranty and callback history',
    ],
  },
  bookSlugs: ['build-a-sellable-business', 'build-a-profitable-business'],
  faqs: [
    { q: 'What is a plumbing company worth?', a: 'Value is usually based on adjusted earnings and the risk in them. Service mix, concentration, licensing, and leadership depth all affect the range. A qualified valuation professional can provide a formal estimate.' },
    { q: 'What happens to my master license if I sell?', a: 'Requirements vary by state and locality. Buyers will want a plan for a licensed qualifier after closing, so it is important to address this early with your attorney.' },
    { q: 'Does new construction work lower my value?', a: 'Not necessarily, but heavy dependence on a few builders can increase perceived risk. Showing a balanced, well-documented mix helps.' },
    { q: 'Can I sell to my employees?', a: 'Employee and management buyouts are possible. They require planning for financing and leadership, and often take longer than an outside sale.' },
  ],
}
