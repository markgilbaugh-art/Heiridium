import type { ServicePageData } from '@/components/site/service-page'
import { getIndustryCategory } from './industries'
import type { IndustryCategory } from './types'

type IndustryPage = ServicePageData & { seo: { title: string; description: string } }

const crumbsFor = (slug: IndustryCategory) => {
  const ind = getIndustryCategory(slug)!
  return [
    { label: 'Who We Serve', href: '/industries' },
    { label: ind.name, href: ind.path },
  ]
}

const imageFor = (slug: IndustryCategory) => getIndustryCategory(slug)!.image

export const industryPages: Record<IndustryCategory, IndustryPage> = {
  retail: {
    path: '/industries/retail',
    serviceName: 'Profit, protection, and succession planning for retail business owners',
    crumbs: crumbsFor('retail'),
    eyebrow: 'Retail',
    title: 'Advisory for owners of established retail businesses',
    intro:
      'Improve merchandise margin, reduce shrink, and prepare your store managers and your family for what comes next.',
    image: imageFor('retail'),
    seo: {
      title: 'Retail Business Profitability, Shrink & Succession Planning',
      description:
        'Advisory for retail store owners: shrink and loss prevention, promotion profitability, labor scheduling, manager development, and succession or sale planning.',
    },
    problem: {
      title: 'Margin leaks hide inside a busy store',
      paragraphs: [
        'Retail owners often see sales and gross margin but not the losses between them: shrink, unprofitable promotions, overstaffed shifts, and markdowns taken too late.',
        'Each of those issues also shapes value. A buyer, a lender, or a family successor wants to see controlled inventory, managers who make decisions, and financials that tie to the stock on the shelf.',
      ],
    },
    pillars: [
      { title: 'Shrink diagnosis', text: 'Separate external theft, employee-related loss, receiving errors, and paperwork shrink before changing procedures.' },
      { title: 'Promotion profitability', text: 'Measure which promotions produce incremental profit and which simply discount sales you would have made anyway.' },
      { title: 'Labor and scheduling', text: 'Match staffing to traffic and conversion so payroll supports sales instead of trailing them.' },
      { title: 'Manager development', text: 'Give store managers clear authority, scorecards, and decisions to own, so stores run without you on the floor.' },
      { title: 'Financial visibility', text: 'Monthly reporting by store and department that ties sales, margin, and inventory together.' },
      { title: 'Succession and sale', text: 'Plan whether the business passes to family, a manager, or a buyer, and coordinate tax and legal advisors early.' },
    ],
    checklist: {
      title: 'Retail readiness checklist',
      items: [
        'Cycle counts on high-risk categories at least monthly',
        'POS permissions and daily refund, void, and no-sale review',
        'Receiving checked against purchase orders before signing',
        'Promotion results reviewed against a baseline',
        'Store-level P&L reviewed each month',
        'A manager in each location with defined spending and markdown authority',
      ],
    },
    bookSlugs: ['build-a-profitable-business', 'protect-what-you-built'],
    faqs: [
      { q: 'Do you work with single-store and multi-location retailers?', a: 'Yes. The issues are similar; multi-location owners usually need more emphasis on store-level reporting and manager development.' },
      { q: 'Do you install cameras or security systems?', a: 'No. We help you identify the causes of loss and the controls that fit them. When a specialist is needed, we help you scope the work and evaluate the result.' },
      { q: 'Can you help if I want a family member to take over the stores?', a: 'Yes. We help families separate ownership from leadership, prepare a successor, and coordinate the CPA and estate attorney involved.' },
    ],
  },
  'construction-trades': {
    path: '/industries/construction-trades',
    serviceName: 'Profit, exit, and succession planning for construction and trade contractors',
    crumbs: crumbsFor('construction-trades'),
    eyebrow: 'Construction & Trades',
    title: 'Advisory for owners of construction and trade companies',
    intro:
      'For general contractors, specialty trades, HVAC, and plumbing companies: stronger job margins, a second-in-command, and a company ready to transfer.',
    image: imageFor('construction-trades'),
    seo: {
      title: 'Construction & Trades Business Profitability, Exit & Succession Planning',
      description:
        'Advisory for construction, HVAC, plumbing, and specialty trade owners: job costing, estimating accuracy, dispatch, purchasing controls, and exit or succession planning.',
    },
    problem: {
      title: 'Busy crews do not guarantee profitable jobs',
      paragraphs: [
        'Many contractors know revenue and backlog but not which jobs, estimators, or crews actually produce profit. Overruns get absorbed, change orders go unbilled, and materials walk off the job.',
        'Buyers, sureties, and lenders look at the same issues: job cost reporting, work-in-progress schedules, and whether the company depends on the owner to estimate, price, and manage every major customer.',
      ],
    },
    pillars: [
      { title: 'Job costing', text: 'Compare estimated and actual labor, materials, and subcontractor costs, and feed the lessons back into bidding.' },
      { title: 'Dispatch and productivity', text: 'Improve first-time fix rates, truck stock, and scheduling so service crews earn more per day.' },
      { title: 'Purchasing controls', text: 'Approval limits, invoice matching, and stock counts that reduce unexplained material losses.' },
      { title: 'Second-in-command', text: 'Prepare a leader to own estimating, pricing, and customer relationships before you step back.' },
      { title: 'Licensing and qualifiers', text: 'Plan for licenses, bonding, and qualifiers that must survive a change of ownership.' },
      { title: 'Exit and succession', text: 'Compare a sale, family transition, or management buyout, and coordinate tax and legal advisors early.' },
    ],
    checklist: {
      title: 'Contractor readiness checklist',
      items: [
        'Estimates and job cost reports use the same cost codes',
        'Monthly work-in-progress schedule',
        'Signed change orders before extra work begins',
        'Purchase order approvals and supplier invoice matching',
        'First-time fix and callback rates tracked for service work',
        'A leader other than you who can price and run jobs',
      ],
    },
    bookSlugs: ['build-a-profitable-business', 'build-a-sellable-business'],
    faqs: [
      { q: 'Do you still work with HVAC and plumbing companies?', a: 'Yes. HVAC and plumbing are part of Construction & Trades, and each has its own page and Academy guides.' },
      { q: 'Do you work with commercial and residential contractors?', a: 'Yes. Commercial work usually needs more focus on WIP reporting and retainage; residential service work on dispatch and recurring agreements.' },
      { q: 'Can you help prepare for bonding or lender reviews?', a: 'We help improve job cost and WIP reporting that sureties and lenders rely on, working alongside your CPA.' },
    ],
  },
  ecommerce: {
    path: '/industries/ecommerce',
    serviceName: 'Profit, protection, and exit planning for e-commerce business owners',
    crumbs: crumbsFor('ecommerce'),
    eyebrow: 'E-commerce',
    title: 'Advisory for owners of established e-commerce businesses',
    intro:
      'See what each order really contributes, build marketing around acquisition cost and repeat purchases, and prepare the business for buyer review.',
    image: imageFor('ecommerce'),
    seo: {
      title: 'E-commerce Profitability, Marketing Economics & Exit Planning',
      description:
        'Advisory for e-commerce owners: contribution margin, customer acquisition cost, repeat purchase rates, fraud prevention, and preparing accounts and contracts for a sale.',
    },
    problem: {
      title: 'Growth can hide thin margins',
      paragraphs: [
        'Online stores often report strong revenue and gross margin while losing money on first orders once ad spend, shipping, payment fees, and returns are counted.',
        'Buyers look past top-line growth to contribution by channel, repeat purchase rates, and whether ad accounts, trademarks, and fulfillment contracts belong to the company and can transfer.',
      ],
    },
    pillars: [
      { title: 'Contribution margin', text: 'Calculate per-order profit after ads, returns, shipping, and fees, by channel and product line.' },
      { title: 'Marketing economics', text: 'Set acquisition cost limits from margin, track payback, and balance prospecting with retention.' },
      { title: 'Repeat purchases', text: 'Measure cohort repeat rates and build the post-purchase programs that drive them.' },
      { title: 'Fraud and account security', text: 'Protect admin and payment accounts and reduce chargebacks and refund abuse.' },
      { title: 'Buyer-ready assets', text: 'Confirm ownership of ad, platform, and marketplace accounts, trademarks, and supplier contracts.' },
      { title: 'Exit planning', text: 'Compare buyers and deal structures and coordinate tax and legal advisors before an offer arrives.' },
    ],
    checklist: {
      title: 'E-commerce readiness checklist',
      items: [
        'Contribution margin reported monthly by channel',
        'Customer acquisition cost and payback by channel',
        'Repeat purchase rate by cohort',
        'Return rate by product line',
        'Ad, platform, and domain accounts owned by the company',
        'Supplier and 3PL contracts reviewed for assignment terms',
      ],
    },
    bookSlugs: ['build-a-profitable-business', 'build-a-sellable-business'],
    faqs: [
      { q: 'Do you run ad campaigns?', a: 'No. We help you set the economics your campaigns must meet and measure whether they do. Your agency or team runs the campaigns.' },
      { q: 'Do you work with marketplace sellers?', a: 'Yes, including brands selling through their own site and marketplaces. Marketplace fees and account transferability get specific attention.' },
      { q: 'What do e-commerce buyers usually ask for?', a: 'Typically monthly financials, contribution by channel, cohort repeat rates, inventory reports, and evidence that accounts and trademarks transfer.' },
    ],
  },
  'professional-services': {
    path: '/industries/professional-services',
    serviceName: 'Profit, succession, and exit planning for professional services firms',
    crumbs: crumbsFor('professional-services'),
    eyebrow: 'Professional Services',
    title: 'Advisory for owners of professional services firms',
    intro:
      'For accounting, engineering, consulting, marketing, and other client-service firms: better utilization, stronger realized rates, and relationships that do not depend on the founder.',
    image: imageFor('professional-services'),
    seo: {
      title: 'Professional Services Firm Profitability, Succession & Exit Planning',
      description:
        'Advisory for professional services firm owners: billable utilization, realized rates, founder dependence, client relationship transfer, and succession or sale planning.',
    },
    problem: {
      title: 'A busy firm can still underperform',
      paragraphs: [
        'Professional services firms often have uneven utilization, write-downs on fixed-fee work, and partners doing work that could be delegated. The firm is busy, but profit lags.',
        'Value depends heavily on whether clients stay when the founder steps back. Buyers and internal successors want to see relationships shared across the team and a business development process that does not rely on one person.',
      ],
    },
    pillars: [
      { title: 'Utilization and realization', text: 'Track billable utilization and realized rates by person, client, and service line.' },
      { title: 'Pricing and scope', text: 'Improve fixed-fee scoping and change-order discipline so engagements stay profitable.' },
      { title: 'Founder dependence', text: 'Introduce second relationship leads and move business development into a team process.' },
      { title: 'Recurring engagements', text: 'Build retainers and recurring work that make revenue more predictable and more valuable.' },
      { title: 'Offboarding and protection', text: 'Repeatable offboarding, access control, and agreements reviewed with counsel.' },
      { title: 'Succession and sale', text: 'Plan internal succession, a merger, or a sale, and coordinate tax and legal advisors early.' },
    ],
    checklist: {
      title: 'Firm readiness checklist',
      items: [
        'Monthly utilization and realization by person',
        'Client profitability report',
        'At least two relationship contacts for each major client',
        'Documented engagement scoping and change-order process',
        'Offboarding checklist used for every departure',
        'Partner or shareholder agreement reviewed recently',
      ],
    },
    bookSlugs: ['build-a-profitable-business', 'build-a-sellable-business'],
    faqs: [
      { q: 'Which kinds of firms do you work with?', a: 'Owner-led accounting, engineering, architecture, consulting, marketing, and similar client-service firms.' },
      { q: 'Can you help plan an internal succession to partners or staff?', a: 'Yes. We help define the path, prepare successors, and coordinate the valuation, tax, and legal advisors involved.' },
      { q: 'How do buyers value a professional services firm?', a: 'Buyers focus on recurring revenue, client concentration, realized rates, and whether relationships transfer beyond the founder.' },
    ],
  },
  'technology-it-services': {
    path: '/industries/technology-it-services',
    serviceName: 'Profit, protection, and exit planning for technology and IT services companies',
    crumbs: crumbsFor('technology-it-services'),
    eyebrow: 'Technology & IT Services',
    title: 'Advisory for owners of technology and IT services companies',
    intro:
      'For managed service providers and IT consultancies: profitable contracts, documented client environments, stronger security, and a company ready to transfer.',
    image: imageFor('technology-it-services'),
    seo: {
      title: 'IT Services & MSP Profitability, Security & Exit Planning',
      description:
        'Advisory for MSP and IT services owners: managed-services contract profitability, client environment documentation, infrastructure security, retention, and exit planning.',
    },
    problem: {
      title: 'Recurring revenue is only as valuable as its margin',
      paragraphs: [
        'Many IT services companies have a few clients that consume a large share of engineering time on contracts priced years ago. Tool costs grow, scope creeps, and margins narrow.',
        'Buyers look for profitable recurring contracts, documented environments, and security practices that do not depend on a few senior engineers who know everything.',
      ],
    },
    pillars: [
      { title: 'Contract profitability', text: 'Assign tickets, hours, and tool costs to each contract and compare against recurring revenue.' },
      { title: 'Documentation', text: 'Client environment records, runbooks, and handoffs that let any engineer support any client.' },
      { title: 'Infrastructure security', text: 'Multi-factor authentication, patching, access reviews, and tested backups, internally and for clients.' },
      { title: 'Delivery capacity', text: 'Plan engineering capacity and standardize environments before adding clients.' },
      { title: 'Retention', text: 'Keep key engineers with clear career paths, incentives, and agreements reviewed with counsel.' },
      { title: 'Exit planning', text: 'Prepare for buyer diligence on contracts, churn, and security, and coordinate tax and legal advisors early.' },
    ],
    checklist: {
      title: 'IT services readiness checklist',
      items: [
        'Profitability calculated for each managed-services contract',
        'Documented environment record for every client',
        'Multi-factor authentication on all admin accounts',
        'Backups tested by restoring them',
        'Contracts with clear scope, renewal, and assignment terms',
        'Client relationships held by more than one person',
      ],
    },
    bookSlugs: ['build-a-profitable-business', 'protect-what-you-built'],
    faqs: [
      { q: 'Do you perform security assessments?', a: 'We help owners understand and prioritize infrastructure security. When technical testing or remediation is needed, we help scope it and evaluate specialists.' },
      { q: 'Do you work with software companies?', a: 'Our focus is technology and IT services firms, including software-enabled service businesses with recurring client contracts.' },
      { q: 'What do buyers look at in an MSP?', a: 'Typically recurring revenue, contract profitability, churn, client concentration, documentation, and security practices.' },
    ],
  },
}
