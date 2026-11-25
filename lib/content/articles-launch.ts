import { editorial } from './articles-published'
import type { Article } from './types'

export const launchArticles: Article[] = [
  {
    slug: 'improve-plumbing-dispatch-and-first-time-fix-rates',
    title: 'How to improve plumbing dispatch and first-time fix rates',
    summary:
      'A practical way for plumbing owners to measure first-time fix rates, find why return trips happen, and tighten dispatch so each truck earns more per day.',
    directAnswer:
      'Start by measuring first-time fix rate by technician, call type, and truck. Most return trips trace back to three causes: incomplete information at booking, missing truck stock, and the wrong skill level sent to the job. Fix intake scripts, standardize truck inventory for your most common calls, and match dispatch to technician capability before adding trucks or staff.',
    topic: 'business-performance',
    industries: ['construction-trades', 'plumbing'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-14T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/plumbing.png', alt: 'A plumber working on a commercial pipe installation.' },
    body: [
      { type: 'h2', text: 'Measure the rate before changing the process' },
      {
        type: 'p',
        text: 'First-time fix rate is the share of service calls resolved on the first visit without a return trip for parts, a second technician, or a callback. Pull 90 days of tickets and tag every call that needed a second visit. Break the result down by technician, call type, and the dispatcher who booked it. The pattern usually points to a cause.',
      },
      {
        type: 'checklist',
        title: 'Common causes of return trips',
        items: [
          'The customer description was vague and the booking script did not ask follow-up questions',
          'The part was not on the truck, and the closest supply house was out of stock',
          'A newer technician was sent to a diagnosis that required senior experience',
          'The job needed a permit, an inspection, or a second person that was not scheduled',
          'Photos or model numbers were not requested before the visit',
        ],
      },
      { type: 'h2', text: 'Tighten dispatch in three moves' },
      {
        type: 'ul',
        items: [
          'Write booking scripts for your ten most common call types, including the photos and model numbers to request.',
          'Standardize a truck stock list for those calls and assign one person to restock it weekly.',
          'Tag technicians by skill level and route diagnostic and water-heater calls to the people most likely to close them on the first visit.',
        ],
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'A plumbing company found 22% of its service calls required a second visit. Nearly half involved water heaters with parts not on the truck. After adding a three-question intake script and stocking common heater parts on four trucks, return visits fell under 12% and each truck completed roughly one more paid call per day.',
      },
      { type: 'h2', text: 'Why it matters for value' },
      {
        type: 'p',
        text: 'A buyer reviewing a plumbing company will look at revenue per technician and callback rates. A documented dispatch process with measured results shows that productivity does not depend on the owner personally sorting the board each morning.',
      },
    ],
    relatedBooks: ['build-a-profitable-business'],
    relatedArticles: ['job-costing-for-plumbing-contractors', 'review-estimated-versus-actual-job-costs'],
  },
  {
    slug: 'find-the-causes-of-store-shrink',
    title: 'Find the causes of store shrink before changing procedures',
    summary:
      'How retail owners can separate external theft, internal loss, receiving errors, and paperwork shrink before spending money on cameras or new rules.',
    directAnswer:
      'Shrink is the gap between recorded and actual inventory, and it has several causes: external theft, employee-related loss, vendor and receiving errors, and administrative mistakes such as mispriced items or unrecorded damage. Count high-risk categories more often, compare results by department and shift, and identify which cause dominates before changing procedures. Each cause has a different fix.',
    topic: 'business-performance',
    industries: ['retail'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-15T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/industries/retail.png', alt: 'A retail store owner and her manager reviewing an inventory count on a tablet.' },
    body: [
      { type: 'h2', text: 'Sort shrink into four buckets' },
      {
        type: 'ul',
        items: [
          'External theft: shoplifting and organized retail crime',
          'Employee-related loss: theft, sweethearting, refund and void abuse',
          'Vendor and receiving errors: short shipments accepted without a count',
          'Administrative error: wrong prices, unrecorded damage or spoilage, and transfers not entered',
        ],
      },
      {
        type: 'p',
        text: 'Annual physical counts tell you how much was lost, not why. Cycle counts on high-value and high-theft categories every two to four weeks show where and when the losses occur.',
      },
      {
        type: 'checklist',
        title: 'Questions to answer from your data',
        items: [
          'Which departments or SKUs carry most of the dollar shrink?',
          'Does shrink rise on specific shifts, days, or under specific managers?',
          'Do received quantities match purchase orders and invoices?',
          'How many refunds, voids, and no-sale drawer openings occur per cashier?',
          'Is damaged or expired product recorded before it is discarded?',
        ],
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'A three-store retailer assumed shoplifting drove its losses. Cycle counts showed most shrink in one store’s back stock, and receiving logs revealed short deliveries signed without counting. A receiving check and vendor credits recovered more than half the loss without adding security staff.',
      },
      {
        type: 'p',
        text: 'Once you know the dominant cause, use the matching controls. See our separate guides on reducing external theft and reducing employee-related losses.',
      },
    ],
    relatedBooks: ['build-a-profitable-business', 'protect-what-you-built'],
    relatedArticles: ['why-profit-and-cash-flow-tell-different-stories'],
  },
  {
    slug: 'calculate-ecommerce-contribution-margin',
    title: 'Calculate contribution margin after ads, returns, and shipping',
    summary:
      'A step-by-step way for e-commerce owners to see what each order actually contributes after acquisition costs, fulfillment, payment fees, and returns.',
    directAnswer:
      'Contribution margin per order is net revenue minus product cost, shipping and fulfillment, payment processing, returns and refunds, and the advertising spent to acquire that order. Many online stores show healthy gross margin but thin or negative contribution once ad spend and returns are counted. Calculate it by channel and by product line, then shift spending toward the orders that pay for overhead.',
    topic: 'business-performance',
    industries: ['ecommerce'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-16T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/industries/ecommerce.png', alt: 'An e-commerce founder and operations lead in a fulfillment space.' },
    body: [
      { type: 'h2', text: 'Build the per-order calculation' },
      {
        type: 'checklist',
        title: 'Subtract from net revenue',
        items: [
          'Landed product cost, including freight and duties',
          'Pick, pack, and outbound shipping',
          'Payment processing and marketplace fees',
          'Expected returns, refunds, and return shipping by product line',
          'Paid advertising allocated to the order’s channel',
          'Discounts and free-shipping subsidies',
        ],
      },
      {
        type: 'p',
        text: 'Run the calculation separately for new and returning customers. A first order often loses money because of acquisition cost, while repeat orders carry little or no ad spend. That gap tells you how much repeat purchasing the business needs to be profitable.',
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'An online brand reported a 62% gross margin. After shipping, fees, an 18% return rate on apparel, and paid social spend, first orders contributed a loss of about $9. Repeat orders contributed $31. The owner reduced prospecting spend on high-return products and invested in post-purchase email, which raised contribution without raising revenue.',
      },
      { type: 'h2', text: 'Why buyers ask for it' },
      {
        type: 'p',
        text: 'Buyers evaluating an e-commerce business look past revenue growth to channel economics, repeat rates, and contribution by cohort. A clear monthly contribution report supports a stronger conversation about value.',
      },
    ],
    relatedBooks: ['build-a-profitable-business', 'build-a-sellable-business'],
    relatedArticles: ['why-profit-and-cash-flow-tell-different-stories'],
  },
  {
    slug: 'measure-billable-utilization-and-realized-rates',
    title: 'Measure billable utilization and realized rates',
    summary:
      'How professional services owners can measure the two numbers that most often explain why a busy firm earns less than expected.',
    directAnswer:
      'Billable utilization is the share of available hours spent on billable client work. Realized rate is what the firm actually collects per hour after write-downs, discounts, and unbilled time. A firm can be busy and still underperform if utilization is uneven across staff or realized rates fall well below standard rates. Track both monthly by person, client, and service line.',
    topic: 'business-performance',
    industries: ['professional-services'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-17T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/industries/professional-services.png', alt: 'A founding partner and colleagues meeting around a conference table.' },
    body: [
      { type: 'h2', text: 'Two calculations' },
      {
        type: 'ul',
        items: [
          'Utilization = billable hours ÷ available hours (after holidays and paid leave)',
          'Realized rate = fees collected ÷ hours worked on the engagement',
          'Realization = realized rate ÷ standard rate',
        ],
      },
      {
        type: 'checklist',
        title: 'Where realized rates leak',
        items: [
          'Fixed-fee engagements that run over scope without a change order',
          'Senior staff doing work that could be delegated',
          'Write-downs to keep long-standing clients happy',
          'Time recorded late or not at all',
          'Receivables that are eventually written off',
        ],
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'A 14-person firm showed 71% average utilization, but two partners were above 90% while three staff were near 50%. Realization on fixed-fee work was 68%. Re-scoping two large clients and reassigning work to underused staff lifted profit while giving partners time for business development.',
      },
      {
        type: 'p',
        text: 'These measures also show a buyer whether revenue depends on the founder’s own hours. That is a central question when valuing a professional services firm.',
      },
    ],
    relatedBooks: ['build-a-profitable-business', 'build-a-sellable-business'],
    relatedArticles: ['how-to-find-out-if-your-company-can-run-without-you'],
  },
  {
    slug: 'track-profitability-by-managed-services-contract',
    title: 'Track profitability by managed-services contract',
    summary:
      'How IT services owners can find which recurring contracts make money and which consume engineering time at a loss.',
    directAnswer:
      'Assign every ticket, project hour, and tool license to the contract it serves, then compare that cost against monthly recurring revenue for each client. Most managed service providers find a small group of clients consumes a large share of engineering time. Reprice, re-scope, or standardize those environments before adding new clients.',
    topic: 'business-performance',
    industries: ['technology-it-services'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-19T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/industries/technology-it-services.png', alt: 'An IT services owner with engineers in front of network dashboards.' },
    body: [
      { type: 'h2', text: 'What to track for each contract' },
      {
        type: 'checklist',
        title: 'Per-client cost inputs',
        items: [
          'Monthly recurring revenue and any one-time project revenue',
          'Ticket count and engineering hours at a fully loaded rate',
          'Per-seat and per-device tool and license costs',
          'After-hours and emergency response time',
          'Out-of-scope work performed without a billable change',
        ],
      },
      {
        type: 'p',
        text: 'Calculate effective hourly rate (contract revenue minus tool cost, divided by engineering hours) for each client. Compare it with your target rate. Clients far below target usually have non-standard environments, outdated hardware, or contracts that predate your current pricing.',
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'An MSP with 40 clients found that six accounted for 38% of ticket hours and earned an effective rate less than half of target. Standardizing two environments, repricing three contracts at renewal, and exiting one client freed capacity equal to a full-time engineer.',
      },
      { type: 'h2', text: 'Why buyers care' },
      {
        type: 'p',
        text: 'Buyers pay for recurring revenue that is profitable and transferable. Contract-level profitability and documented client environments help show that value does not depend on a few senior engineers.',
      },
    ],
    relatedBooks: ['build-a-profitable-business', 'build-a-sellable-business'],
    relatedArticles: ['why-profit-and-cash-flow-tell-different-stories'],
  },
  {
    slug: 'review-estimated-versus-actual-job-costs',
    title: 'Review estimated versus actual job costs',
    summary:
      'A monthly routine for contractors to compare estimates with actual labor, materials, and subcontractor costs, and feed the lessons back into bidding.',
    directAnswer:
      'After each job, or monthly for long projects, compare estimated and actual hours, materials, subcontractors, and change orders line by line. Look for patterns by estimator, job type, and crew. When the same line runs over repeatedly, update your estimating assumptions rather than treating each overrun as a one-time problem.',
    topic: 'business-performance',
    industries: ['construction-trades', 'hvac', 'plumbing'],
    author: editorial,
    requiresProfessionalReview: false,
    status: 'published',
    publishAt: '2026-11-23T13:00:00.000Z',
    week: 1,
    cover: { src: '/images/industries/construction-trades.png', alt: 'A contractor and project manager reviewing plans and a job cost report.' },
    body: [
      { type: 'h2', text: 'Set up the comparison' },
      {
        type: 'p',
        text: 'Your estimate and your job cost report need the same cost codes. If the estimate groups labor as one number but the field tracks hours by phase, you cannot see where the overrun happened. Align the codes first.',
      },
      {
        type: 'checklist',
        title: 'Monthly job cost review',
        items: [
          'Estimated versus actual labor hours by phase',
          'Material cost variance, including waste and returns',
          'Subcontractor variance and unapproved extras',
          'Change orders approved, pending, and performed without approval',
          'Percent complete versus percent billed',
          'Projected final margin compared with bid margin',
        ],
      },
      {
        type: 'example',
        title: 'Illustrative example',
        text: 'A commercial contractor reviewed 30 completed jobs and found finish labor ran 25% over estimate on nearly every tenant improvement project. Updating the estimating template and requiring signed change orders for owner-requested finishes restored about four points of gross margin on the next year’s work.',
      },
      {
        type: 'p',
        text: 'A consistent review also produces work-in-progress reporting that lenders, sureties, and eventual buyers rely on.',
      },
    ],
    relatedBooks: ['build-a-profitable-business'],
    relatedArticles: ['job-costing-for-plumbing-contractors', 'what-to-include-in-a-monthly-close'],
  },
]
