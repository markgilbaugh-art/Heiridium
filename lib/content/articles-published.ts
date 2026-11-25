import type { Article, Person } from './types'

export const editorial: Person = { name: 'Heiridium Editorial Team', role: 'Advisory staff' }

export const publishedArticles: Article[] = [
  {
    slug: 'why-profit-and-cash-flow-tell-different-stories',
    title: 'Why profit and cash flow tell different stories',
    summary:
      'Your P&L can show a strong year while the bank account feels tight. Here is why that happens in service contracting, and what to watch each month.',
    directAnswer:
      'Profit measures what you earned on paper during a period. Cash flow measures what actually moved through the bank. In HVAC and plumbing companies the two drift apart because of receivables, inventory, equipment purchases, loan principal, and owner distributions, none of which line up neatly with when revenue is recorded.',
    topic: 'business-performance',
    industries: ['hvac', 'plumbing', 'home-services'],
    tags: ['exit-readiness'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-18T13:00:00.000Z',
    week: 1,
    body: [
      { type: 'h2', text: 'Where the gap comes from' },
      {
        type: 'ul',
        items: [
          'Receivables: a large commercial or new-construction job is recorded as revenue when invoiced, but the check may arrive 45 to 90 days later.',
          'Inventory and truck stock: parts bought in bulk leave the bank today and reach the P&L only when they are used on a job.',
          'Equipment and vehicles: a new service van is a large cash outflow, but it reaches the P&L slowly through depreciation.',
          'Loan principal: interest is an expense, principal is not. Paying down a line of credit reduces cash without reducing profit.',
          'Owner distributions: in many pass-through entities, distributions reduce cash but never appear as an expense.',
        ],
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'A plumbing company reports $640,000 of net income for the year. During the same year it added three vans, carried $180,000 more in commercial receivables than the prior year, and paid down $120,000 of equipment loans. The owner sees a strong P&L and a bank balance that barely moved. Both numbers are accurate. They answer different questions.',
      },
      { type: 'h2', text: 'Why this matters before a sale or transition' },
      {
        type: 'p',
        text: 'Buyers usually value a company on adjusted earnings, then negotiate working capital separately. If receivables or inventory swing widely, the working capital target in a purchase agreement can change how much cash you receive at closing. Understanding your cash cycle years in advance gives you room to fix it.',
      },
      {
        type: 'checklist',
        title: 'Review these every month',
        items: [
          'Net income and operating cash flow side by side',
          'Receivables aged by 30, 60, and 90+ days',
          'Inventory and truck stock value',
          'Capital purchases and planned purchases for the next two quarters',
          'Loan principal payments and owner distributions',
          'A 13-week cash forecast that reflects your seasonal pattern',
        ],
      },
      {
        type: 'p',
        text: 'If those numbers are not available within two weeks of month end, start with the monthly close. Book I covers the close, job costing, and cash forecasting in detail.',
      },
    ],
    relatedBooks: ['build-a-profitable-business', 'build-a-sellable-business'],
    relatedArticles: ['what-to-include-in-a-monthly-close', 'job-costing-for-plumbing-contractors'],
  },
  {
    slug: 'what-to-include-in-a-monthly-close',
    title: 'What to include in a monthly close for a service contractor',
    summary:
      'A practical monthly close checklist for HVAC, plumbing, and home-services companies so financial statements are ready to use within two weeks.',
    directAnswer:
      'A useful monthly close reconciles every bank and credit account, records all revenue and job costs in the right month, reviews receivables and payables, counts or estimates inventory, and produces a P&L, balance sheet, and cash flow statement your team reviews within about two weeks of month end.',
    topic: 'business-performance',
    industries: ['hvac', 'plumbing', 'home-services'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-20T13:00:00.000Z',
    week: 1,
    body: [
      {
        type: 'p',
        text: 'Most owners first notice the cost of a weak close when a lender, CPA, or buyer asks for financials and the answer is “give us a few weeks.” A consistent close turns accounting into a management tool instead of a year-end scramble.',
      },
      {
        type: 'checklist',
        title: 'Monthly close checklist',
        items: [
          'Reconcile all bank, credit card, and loan accounts',
          'Confirm every completed job is invoiced in the month the work was done',
          'Match job materials and subcontractor bills to the jobs they belong to',
          'Record payroll, payroll taxes, and benefits in the correct period',
          'Review receivables by age and follow up on balances past 60 days',
          'Review payables and accrue unbilled vendor costs',
          'Update inventory or truck stock with a count or reasonable estimate',
          'Record depreciation and any prepaid expenses',
          'Separate personal or owner expenses so add-backs are documented',
          'Produce a P&L, balance sheet, and cash flow statement',
          'Compare results to budget and the same month last year',
        ],
      },
      { type: 'h2', text: 'Who owns each step' },
      {
        type: 'p',
        text: 'In a company with $3 million to $20 million of revenue, the close is usually split between an office manager or controller and an outside bookkeeper or CPA. Write down who owns each line, the due date, and how the owner reviews the result. That document itself becomes evidence for a buyer that the company runs on process.',
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'An HVAC company moved its close from 45 days to 12 days by invoicing at job completion from the field, reconciling the fuel card weekly, and closing inventory from truck stock counts on the last Friday of the month.',
      },
    ],
    relatedBooks: ['build-a-profitable-business'],
    relatedArticles: ['why-profit-and-cash-flow-tell-different-stories'],
  },
  {
    slug: 'job-costing-for-plumbing-contractors',
    title: 'Job costing for plumbing contractors',
    summary:
      'How plumbing companies can see the true profit of service calls and project work, and why it changes pricing, scheduling, and valuation.',
    directAnswer:
      'Job costing assigns labor, materials, subcontractors, and a fair share of overhead to each job so you can see its real profit. For plumbing contractors, the most important step is separating service work from project and new-construction work, because they usually carry very different margins and risks.',
    topic: 'business-performance',
    industries: ['plumbing'],
    tags: ['exit-readiness'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-21T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/plumbing.png', alt: 'A veteran plumber and an apprentice reviewing a job ticket in an organized pipe warehouse.' },
    body: [
      { type: 'h2', text: 'Start with service versus project' },
      {
        type: 'p',
        text: 'Service and repair calls often produce higher gross margins and faster payment. Project, remodel, and new-construction work can bring volume but often carries retainage, change-order disputes, and longer receivable cycles. Blending them in one P&L hides which part of the company is creating value.',
      },
      {
        type: 'checklist',
        title: 'What every job record should capture',
        items: [
          'Revenue type: service, maintenance, remodel, new construction, or commercial',
          'Direct labor hours and fully loaded labor rate',
          'Materials pulled from truck stock and purchased for the job',
          'Subcontractor, permit, and equipment rental costs',
          'Callbacks and warranty time charged back to the original job',
          'An overhead allocation per labor hour',
        ],
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'A plumbing company found its new-construction division produced 42% of revenue but only 11% of gross profit once callbacks and slow payment were included. The owner raised project pricing, reduced the builder backlog, and shifted two crews to service. Gross profit rose the following year on lower revenue.',
      },
      { type: 'h2', text: 'Why buyers care' },
      {
        type: 'p',
        text: 'Buyers often value recurring service revenue more highly than project revenue. Clean job costing lets you show what each revenue stream earns, which supports a clearer conversation about value and reduces diligence questions later.',
      },
    ],
    relatedBooks: ['build-a-profitable-business', 'build-a-sellable-business'],
    relatedArticles: ['why-profit-and-cash-flow-tell-different-stories'],
  },
  {
    slug: 'what-buyers-look-for-in-hvac-maintenance-agreements',
    title: 'What buyers look for in HVAC maintenance agreements',
    summary:
      'Maintenance agreements can be one of the most valuable parts of an HVAC company. Here is how buyers evaluate them during diligence.',
    directAnswer:
      'Buyers look at how many active agreements you have, how many renew each year, how reliably the included visits are completed, how much repair and replacement revenue agreement customers generate, and whether the agreements are documented in a system rather than in the owner’s head.',
    topic: 'exit-readiness',
    industries: ['hvac'],
    tags: ['business-performance'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-22T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/hvac.png', alt: 'An HVAC technician servicing a residential condenser unit beside a brick home.' },
    body: [
      {
        type: 'p',
        text: 'A maintenance agreement base gives a buyer predictable visits, a steady flow of repair opportunities, and future replacement leads. It also smooths seasonality. That is why buyers study it closely.',
      },
      {
        type: 'checklist',
        title: 'Metrics to have ready',
        items: [
          'Active agreements by tier, residential versus commercial',
          'Annual renewal rate and how it is calculated',
          'Percentage of included visits completed on schedule',
          'Repair and replacement revenue from agreement customers',
          'Agreement revenue recognition: when it is billed and when it is earned',
          'Average customer tenure and cancellation reasons',
        ],
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'Two HVAC companies each report 2,400 agreements. One renews 82% annually, completes visits on schedule, and tracks replacement revenue from members. The other auto-renews on paper but completed half of last year’s visits. A buyer is likely to treat the first base as recurring revenue and the second as a liability, because those unfinished visits are owed to customers after closing.',
      },
      { type: 'h2', text: 'Seasonality and dispatch' },
      {
        type: 'p',
        text: 'Scheduling maintenance in shoulder seasons keeps technicians productive and reduces overtime in peak months. Showing that pattern in dispatch data helps a buyer see that the agreement base is managed, not just sold.',
      },
    ],
    relatedBooks: ['build-a-sellable-business', 'build-a-profitable-business'],
    relatedArticles: ['how-to-find-out-if-your-company-can-run-without-you'],
  },
  {
    slug: 'how-to-find-out-if-your-company-can-run-without-you',
    title: 'How to find out if your company can run without you',
    summary:
      'A practical way for trade business owners to measure founder dependence, the factor that most often reduces value and complicates succession.',
    directAnswer:
      'List every decision, relationship, and task that still requires you, then test it: step away for planned periods, track what comes back to you, and assign an owner and a documented process for each item. A company that can run for a month without its founder is easier to sell, finance, and pass to the next generation.',
    topic: 'exit-readiness',
    industries: ['hvac', 'plumbing', 'home-services'],
    tags: ['succession-wealth'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-24T13:00:00.000Z',
    week: 1,
    body: [
      {
        type: 'p',
        text: 'Buyers call it key-person risk. Heirs experience it as a company that suddenly loses its center. Either way, the more a business depends on its founder, the less it is worth to anyone else.',
      },
      {
        type: 'checklist',
        title: 'Founder-dependence self-test',
        items: [
          'Do your largest customers or builders call you directly?',
          'Do you approve most estimates, pricing exceptions, or purchases?',
          'Are licenses or qualifiers held only in your name?',
          'Do key vendors extend terms because of your personal relationship?',
          'Could your service manager handle a peak-season week without you?',
          'Are hiring and termination decisions made by someone other than you?',
          'Is your know-how written down anywhere?',
        ],
      },
      { type: 'h2', text: 'Run a planned absence' },
      {
        type: 'p',
        text: 'Start with a one-week absence and a simple log kept by your leadership team: every question, approval, or problem that would normally have reached you. Repeat with longer absences. The log becomes your transition plan.',
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'An HVAC owner logged 61 items during a two-week trip. Thirty-eight were pricing approvals that a written pricing policy resolved. Twelve were customer escalations the service manager could handle with clear authority. The rest became the basis for promoting an operations manager.',
      },
    ],
    relatedBooks: ['build-a-sellable-business', 'build-generational-wealth'],
    relatedArticles: ['what-buyers-look-for-in-hvac-maintenance-agreements', 'sell-the-company-or-pass-it-to-family'],
  },
  {
    slug: 'sell-the-company-or-pass-it-to-family',
    title: 'Sell the company or pass it to family?',
    summary:
      'A framework for business-owning families weighing a sale against a family transfer or continued ownership under professional management.',
    directAnswer:
      'There are usually three paths: sell to an outside buyer, transfer ownership within the family, or keep ownership while professional managers run the company. The right choice depends on your financial needs, your family’s interest and readiness, the company’s independence from you, and how much risk you want to keep.',
    topic: 'succession-wealth',
    industries: ['hvac', 'plumbing', 'home-services'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-25T13:00:00.000Z',
    week: 4,
    cover: { src: '/images/family-table.png', alt: 'An owner and his adult daughter reviewing financial statements at a kitchen table.' },
    body: [
      { type: 'h2', text: 'Three paths, three sets of questions' },
      {
        type: 'ul',
        items: [
          'Sale to an outside buyer: converts the company to liquidity, usually with some proceeds deferred. Ask what you need to keep after taxes and fees to be financially secure.',
          'Family transfer: keeps the company in the family, but usually requires a capable leader, a fair approach for heirs who are not in the business, and careful tax and estate planning.',
          'Professional management: you or your family keep ownership and income while a hired leadership team runs operations. This works best when the company already runs well without you.',
        ],
      },
      {
        type: 'checklist',
        title: 'Questions to answer as a family',
        items: [
          'How much income and liquidity do we need over the next 20 years?',
          'Does anyone in the family want to lead the company, and are they ready?',
          'How do we treat heirs who will not work in the business?',
          'How much business risk do we want to keep?',
          'What do we owe the employees who helped build the company?',
        ],
      },
      {
        type: 'p',
        text: 'Each path has tax and legal consequences that depend on your entity, ownership, and documents. Bring your CPA and estate attorney in early. Heiridium helps families frame the decision, prepare the company for whichever path they choose, and coordinate the professionals involved.',
      },
    ],
    relatedBooks: ['build-generational-wealth', 'build-a-sellable-business'],
    relatedArticles: ['how-to-find-out-if-your-company-can-run-without-you'],
  },
  {
    slug: 'who-owns-your-company-name-domain-and-phone-number',
    title: 'Who owns your company name, domain, and phone number?',
    summary:
      'Buyers expect the company to own its brand, website, and phone numbers. Here is how to check before diligence begins.',
    directAnswer:
      'Confirm that the operating company, not you personally or a former employee or vendor, is the registered owner of its trade name and any trademark, its website domain, its main phone numbers, and its key software and advertising accounts. Fix gaps early, because transfers can take weeks.',
    topic: 'exit-readiness',
    industries: ['hvac', 'plumbing', 'home-services'],
    tags: ['tax-asset-protection'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'scheduled',
    publishAt: '2026-11-26T13:00:00.000Z',
    week: 2,
    body: [
      {
        type: 'checklist',
        title: 'Ownership audit',
        items: [
          'Trade name registrations and any federal or state trademark',
          'Website domain registrar account and who holds the login',
          'Main and tracking phone numbers and the carrier account holder',
          'Google Business Profile, ad, and social media accounts',
          'Field service, accounting, and CRM software subscriptions',
          'Vehicle wraps, signage, and design files',
        ],
      },
      {
        type: 'p',
        text: 'Ask your attorney whether any trademark filing or assignment makes sense. Many owners find that a web designer registered the domain years ago, or that the phone numbers are on a personal account. Each of these can delay a closing.',
      },
    ],
    relatedBooks: ['build-a-sellable-business'],
  },
]
