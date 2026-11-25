import type { MetadataRoute } from 'next'
import { getLiveArticles } from '@/lib/content/articles'
import { books } from '@/lib/content/books'
import { allIndustries, industryCategories } from '@/lib/content/industries'
import { topics } from '@/lib/content/topics'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

const staticRoutes = [
  '/',
  '/how-we-help',
  '/exit-planning',
  '/tax-planning-before-a-sale',
  '/succession-planning',
  '/industries',
  ...industryCategories.map((i) => i.path),
  '/industries/hvac',
  '/industries/plumbing',
  ...allIndustries.map((i) => `/academy/industries/${i.slug}`),
  '/books',
  '/academy',
  '/about',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...books.map((b) => ({ url: `${SITE_URL}/books/${b.slug}` })),
    ...topics.map((t) => ({ url: `${SITE_URL}/academy/topics/${t.slug}` })),
    ...getLiveArticles().map((a) => ({
      url: `${SITE_URL}/academy/${a.slug}`,
      lastModified: new Date(a.revisedAt ?? a.publishAt),
    })),
  ]
}
