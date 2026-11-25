import type { Industry, IndustryCategory, IndustrySpecialty } from './types'

export type IndustryRecord = {
  slug: Industry
  name: string
  navLabel: string
  path: string
  image: { src: string; alt: string }
  cardIssue: string
  academyIntro: string
  parent?: IndustryCategory
}

export const industryCategories: (IndustryRecord & { slug: IndustryCategory })[] = [
  {
    slug: 'retail',
    name: 'Retail',
    navLabel: 'Retail',
    path: '/industries/retail',
    image: {
      src: '/images/industries/retail.png',
      alt: 'A retail store owner and her store manager reviewing an inventory count on a tablet beside stocked shelving before opening.',
    },
    cardIssue: 'Shrink, labor scheduling, and markdowns quietly erode merchandise margin long before the P&L shows it.',
    academyIntro:
      'Guides for owners of independent and multi-location stores: shrink, promotions, labor, merchandise margin, and preparing managers to make more decisions.',
  },
  {
    slug: 'construction-trades',
    name: 'Construction & Trades',
    navLabel: 'Construction & Trades',
    path: '/industries/construction-trades',
    image: {
      src: '/images/industries/construction-trades.png',
      alt: 'A contractor and his project manager reviewing plans and a job cost report on a workbench in an organized shop.',
    },
    cardIssue: 'Estimates that drift from actual job costs leave crews busy and margins thin, and a buyer will find the gap.',
    academyIntro:
      'Guides for general contractors, specialty trades, HVAC, and plumbing companies: job costing, estimating, dispatch, purchasing controls, and building a second-in-command.',
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    navLabel: 'E-commerce',
    path: '/industries/ecommerce',
    image: {
      src: '/images/industries/ecommerce.png',
      alt: 'An e-commerce founder talking with an operations lead among packing stations and inventory shelving in a fulfillment space.',
    },
    cardIssue: 'Revenue can grow while contribution margin shrinks once ad spend, returns, and shipping are counted per order.',
    academyIntro:
      'Guides for direct-to-consumer and marketplace sellers: contribution margin, acquisition costs, repeat purchases, fraud, and preparing accounts and contracts for buyer review.',
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    navLabel: 'Professional Services',
    path: '/industries/professional-services',
    image: {
      src: '/images/industries/professional-services.png',
      alt: 'A founding partner and two colleagues meeting around a conference table with printed reports and a laptop.',
    },
    cardIssue: 'When the founder holds the key client relationships, a buyer sees revenue that may walk out the door.',
    academyIntro:
      'Guides for accounting, engineering, consulting, marketing, and other client-service firms: utilization, realized rates, recurring engagements, offboarding, and transferring founder relationships.',
  },
  {
    slug: 'technology-it-services',
    name: 'Technology & IT Services',
    navLabel: 'Technology & IT Services',
    path: '/industries/technology-it-services',
    image: {
      src: '/images/industries/technology-it-services.png',
      alt: 'An IT services owner standing with two engineers at a desk with network dashboards and a tidy server rack behind them.',
    },
    cardIssue: 'Recurring contracts look valuable until a buyer asks which ones are profitable and who documents each client environment.',
    academyIntro:
      'Guides for managed service providers, IT consultancies, and software-enabled service firms: contract profitability, documentation, retention, delivery capacity, and infrastructure security.',
  },
]

export const industrySpecialties: (IndustryRecord & { slug: IndustrySpecialty })[] = [
  {
    slug: 'hvac',
    name: 'HVAC',
    navLabel: 'HVAC companies',
    path: '/industries/hvac',
    parent: 'construction-trades',
    image: {
      src: '/images/hvac.png',
      alt: 'An HVAC technician servicing a rooftop unit.',
    },
    cardIssue: 'Maintenance agreements, seasonality, and technician retention shape what a buyer will pay.',
    academyIntro:
      'Guides for HVAC company owners: maintenance agreement renewals and profitability, seasonality, dispatch, and the reporting buyers use to evaluate an HVAC business.',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    navLabel: 'Plumbing companies',
    path: '/industries/plumbing',
    parent: 'construction-trades',
    image: {
      src: '/images/plumbing.png',
      alt: 'A plumber working on a commercial pipe installation.',
    },
    cardIssue: 'Dispatch, first-time fix rates, and job costing decide whether service and project work are both profitable.',
    academyIntro:
      'Guides for plumbing company owners: dispatch and first-time fix rates, service versus project job costing, licensing continuity, and crew leadership.',
  },
]

export const allIndustries: IndustryRecord[] = [...industryCategories, ...industrySpecialties]

export function getIndustry(slug: string) {
  return allIndustries.find((i) => i.slug === slug)
}

export function getIndustryCategory(slug: string) {
  return industryCategories.find((i) => i.slug === slug)
}

export function industryFamily(slug: Industry): Industry[] {
  const children = industrySpecialties.filter((s) => s.parent === slug).map((s) => s.slug)
  return [slug, ...children]
}
