import type { Metadata } from 'next'

export const SITE_URL = 'https://heiridium.com'

export const SITE_NAME = 'Heiridium'

export const IS_INDEXABLE = process.env.VERCEL_ENV === 'production'

export const mainNav = [
  { label: 'Consulting', href: '/how-we-help' },
  { label: 'Sell Your Business', href: '/exit-planning' },
  {
    label: 'Who We Serve',
    href: '/industries',
    children: [
      { label: 'Retail', href: '/industries/retail' },
      { label: 'Construction & Trades', href: '/industries/construction-trades' },
      { label: 'E-commerce', href: '/industries/ecommerce' },
      { label: 'Professional Services', href: '/industries/professional-services' },
      { label: 'Technology & IT Services', href: '/industries/technology-it-services' },
      { label: 'All industries', href: '/industries' },
    ],
  },
  { label: 'Books', href: '/books' },
  { label: 'Academy', href: '/academy' },
  { label: 'About', href: '/about' },
] as const

export const CONSULT_CTA = { label: 'Schedule a Private Conversation', href: '/contact' }

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article'
}

export function pageMetadata({
  title,
  description,
  path,
  image = '/images/books/series.png',
  noindex,
  type = 'website',
}: PageMetaInput): Metadata {
  return {
    title: title.includes(SITE_NAME) ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    robots: noindex ? { index: false, follow: false } : undefined,
  }
}
