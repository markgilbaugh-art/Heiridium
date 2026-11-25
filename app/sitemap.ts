import type { MetadataRoute } from 'next'
import { getLiveArticles } from '@/lib/content/articles'
import { books } from '@/lib/content/books'
import { topics } from '@/lib/content/topics'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

const staticRoutes = [
  '/',
  '/how-we-help',
  '/exit-planning',
  '/tax-planning-before-a-sale',
  '/succession-planning',
  '/industries/hvac',
  '/industries/plumbing',
  '/books',
  '/academy',
  '/about',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    ...staticRoutes.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now })),
    ...books.map((b) => ({ url: `${SITE_URL}/books/${b.slug}`, lastModified: now })),
    ...topics.map((t) => ({ url: `${SITE_URL}/academy/topics/${t.slug}`, lastModified: now })),
    ...getLiveArticles().map((a) => ({
      url: `${SITE_URL}/academy/${a.slug}`,
      lastModified: new Date(a.revisedAt ?? a.publishAt),
    })),
  ]
}
